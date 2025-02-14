import { useContext} from "react";
import authImg from "../../assets/others/authentication2.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialAcc from "../../Shared/SocialAcc";

const SignUp = () => {
  const { createUser, updatePfp } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
        const loggedUser = result.user;
        updatePfp({ displayName: data.name, photoURL: data.photoURL })
        const user = {
          name: data.name,
          email: data.email,
          photoURL: data.photoURL
        }
        axiosPublic.post('users', user)
        .then(res=>{
          if(res.data.insertedId ){
            console.log('user signed up', user);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Sign up successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/')
          }
        })
    })
    .catch(error=>{
        console.log(error.message);
    })
  };

  return (
    <div className="login-page py-16">
      <Helmet>
        <title>Bistro | SignUp</title>
      </Helmet>
      <div className="flex flex-col md:flex-row-reverse items-center justify-center border-4 border-gray-100 shadow-2xl py-6 w-10/12 mx-auto">
        {/* Left Side Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={authImg}
            alt="Decorative Image"
            className="max-w-md md:max-w-3xl object-cover"
          />
        </div>

        {/* Login Form */}
        <div className="flex-1 max-w-lg bg-opacity-90 p-8 rounded-lg mx-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Signup
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full bg-white text-black border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 mt-2">Name required</span>
              )}
            </div>
            {/* PhotoUrl */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-gray-700"
              >
                PhotoUrl
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Enter your photoUrl"
                className="w-full bg-white text-black border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                {...register("photoURL", { required: true })}
              />
              {errors.photoURL && (
                <span className="text-red-500 mt-2">photoURL required</span>
              )}
            </div>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-white text-black border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 mt-2">Email required</span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full bg-white text-black border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500 mt-2">Password required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 mt-2">
                  At lest 6 word required
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500 mt-2">
                  password should contain one upper case one lower case and one
                  digit and one special character
                </span>
              )}
            </div>

            {/* button login */}
            <input
              type="submit"
              value="Signup"
              className="btn w-full bg-[#D1A054] hover:bg-[#8a6020] text-white font-bold py-2 rounded-md "
            />

            {/* exist Account Link */}
            <p className="text-base font-semibold text-center text-black mt-4">
              Already registered?{" "}
              <Link to="/login" className="text-[#D1A054] hover:underline">
                Go to log in
              </Link>
            </p>
            <br />
            <p className="text-base font-semibold text-center text-neutral-600 mt-4">
              or sign up{" "}
            </p>
            <SocialAcc></SocialAcc>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
