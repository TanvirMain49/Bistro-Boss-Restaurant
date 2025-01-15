import React from "react";
import UseAuth from "../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";

const Card = ({ item }) => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const[, refetch] = useCart();

  const handleAddCart = (foodItem) => {
    if (user && user.email) {
      //todo
      console.log(foodItem, user.email);
      const cartItem = {
        menuId: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        email: user.email,
      };

      axiosSecure.post("carts", cartItem).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.name} is added`,
            showConfirmButton: false,
            timer: 1500,
          });
        //refetch the data for the card count
        refetch(); 
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col grow">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col grow">
        <h3 className="text-xl font-semibold mb-2 text-center">{item.name}</h3>
        <p className="text-gray-600 mb-4 text-center">{item.recipe}</p>
        <div className="flex justify-center items-center mt-auto">
          <button
            onClick={() => handleAddCart(item)}
            className="flex-grow bg-gray-200 border-b-4 border-[#BB8506] text-[#BB8506] font-semibold py-2 px-6 rounded-lg hover:bg-black hover:text-white hover:scale-95 transition-transform"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
