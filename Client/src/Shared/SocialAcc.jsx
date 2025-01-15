import React from "react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import UseAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialAcc = () => {
  const { signInWithGoogle } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        const user = {
          name: res.user?.displayName,
          email: res.user?.email,
          photoURL: res.user?.photoURL
        }
        axiosPublic.post('users', user)
        .then(result=>{
          console.log(result.data);
          Swal.fire({
            title: "Welcome Back!",
            text: "Logged in successfully!",
            icon: "success",
          });
          navigate("/");
        })
        })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex items-center justify-center  space-x-4">
      {/* Facebook Icon */}
      <a
        href="#"
        className="p-3 rounded-full border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
      >
        <FaFacebookF />
      </a>
      {/* Google Icon */}
      <button
        onClick={handleGoogleLogin}
        href="#"
        className="p-3 rounded-full border border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
      >
        <FaGoogle />
      </button>
      {/* Github Icon */}
      <a
        href="#"
        className="p-3 rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black"
      >
        <FaGithub />
      </a>
    </div>
  );
};

export default SocialAcc;
