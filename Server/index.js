require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT|| 5000;

// middle ware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kriop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const menuCollection = client.db('BistroBoss').collection('Menu');
    const cartCollection = client.db('BistroBoss').collection('cart');
    const usersCollection = client.db('BistroBoss').collection('user');

// jwt token api
app.post('/jwt', async(req, res)=>{
  const user = req.body;
  const token = jwt.sign(user, process.env.TOKEN, {expiresIn: '1h'});
  res.send({token});
})

// middleware
const verifyToken = (req, res, next)=>{
  if(!req.headers.authorization){
    return res.status(401).send({message: "unauthorize access"})
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.TOKEN, (err, decoded)=>{
    if(err){
      return res.status(401).send({message: "unauthorize access"})
    }
    req.decoded = decoded;
    next();
  })
}
// middle ware to cheek if the user is admin or not
const verifyAdmin = async(req, res, next)=>{
  const email = req.decoded.email;
  const query = {email: email}
  const user = await usersCollection.findOne(query);
  const isAdmin = user?.role === "Admin"
  if(!isAdmin){
    return res.status(403).send({message: "unauthorize access"});
  }
  next();
}

// userCollection apis
// get all user and need to verifyToken cause this api only admin can use
app.get('/users', verifyToken, verifyAdmin, async(req, res)=>{
  const result = await usersCollection.find().toArray();
  res.send(result);
})

// just and api to cheek if the user is admin or not return true or false value
app.get('/users/admin/:email', verifyToken, async(req, res)=>{
  const email = req.params.email;

  //cheeking if the user is using this token or not (aka verifyToken () work)
  if(email !== req.decoded.email){
    return res.status(403).send({message: "forbidden access"})
  }
  const query = {email: email};
  const user = await usersCollection.findOne(query);
  let admin= false;
  if(user){
    admin = user.role === "Admin";
  }
  res.send({admin});

})

// create user for the website
app.post('/users', async(req, res)=>{
  const user = req.body;
  const query = {email: user.email};
  const existing = await usersCollection.findOne(query);
  if(existing){
    return res.send({message:"User already exist", insertedId:null})
  }
  const result = await usersCollection.insertOne(user);
  res.send(result);
})

// update user role to admin. we use patch because we are just updating the role to admin 
app.patch('/users/admin/:id', async(req, res)=>{
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)}
  const updateDoc = {
    $set:{
      role: 'Admin'
    }
  }
  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
})

// delete user
app.delete('/users/:id', async(req, res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await usersCollection.deleteOne(query)
  res.send(result)
})



// menuCollection apis


//get menu
    app.get('/menu', async(req, res)=>{
        const result = await menuCollection.find().toArray();
        res.send(result);
    })


// cartCollection apis

// cart get (all)
app.get('/carts', async(req,res)=>{
  const email = req.query.email;
  const query = {email: email};
  const result = await cartCollection.find(query).toArray();
  res.send(result);
})

//cart Post
app.post('/carts', async(req, res)=>{
  const cart = req.body;
  const result = await cartCollection.insertOne(cart);
  res.send(result);
})

// cart Delete
app.delete('/carts/:id', async(req, res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await cartCollection.deleteOne(query);
  res.send(result);
})


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('boss is back....');
})

app.listen(port, ()=>{
    console.log(`server is running at${port}`);
})
