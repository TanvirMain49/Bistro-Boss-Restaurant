import { useContext, useEffect, useRef, useState } from "react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import Swal from 'sweetalert2'
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import authImg from "../../assets/others/authentication2.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialAcc from "../../Shared/SocialAcc";

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password)
      .then((res) => {
        const user = res.user;
        Swal.fire({
            title: "Welcome Back!",
            text: "You Logged in successfully!",
            icon: "success"
          });
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message);
      });

    // You can now use these values for further processing (e.g., API call)
  };

  const handleCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  return (
    <div className="login-page py-16">
      <Helmet>
        <title>Bistro | Login</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-center border-4 border-gray-100 shadow-2xl py-6 w-10/12 mx-auto">
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
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                required
              />
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
                required
              />
            </div>

            {/* CAPTCHA */}
            <div>
              <div className="flex justify-between items-center py-3">
                <LoadCanvasTemplate />
              </div>
              <input
                type="text"
                id="captcha"
                name="captcha"
                placeholder="Type here"
                onBlur={handleCaptcha}
                className="w-full bg-white text-black border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-2"
              />
            </div>

            <input
              type="submit"
              value="login"
              disabled={btnDisable}
              className="btn w-full bg-[#D1A054] hover:bg-[#8a6020] text-white font-bold py-2 rounded-md "
            />

            {/* New Account Link */}
            <p className="text-base font-semibold text-center text-black mt-4">
              New here?{" "}
              <Link to="/signup" className="text-[#D1A054] hover:underline">
                Create a New Account
              </Link>
              <br />
              or log in
            </p>

            {/* Social Login */}
            <SocialAcc></SocialAcc>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
