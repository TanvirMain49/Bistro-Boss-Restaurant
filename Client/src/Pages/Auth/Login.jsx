import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import authImg from '../../assets/others/authentication2.png'
import './Login.css'

const Login = () => {
  const captchaRef = useRef(null);
  const [btnDisable, setBtnDisable] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const captcha = form.captcha.value;

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Captcha:", captcha);

    // You can now use these values for further processing (e.g., API call)
  };

  const handleCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  return (
    <div className="login-page py-16">
      <div className="flex flex-col md:flex-row items-center justify-center border-4 border-gray-100 shadow-2xl py-10 w-10/12 mx-auto">
        {/* Left Side Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={authImg}
            alt="Decorative Image"
            className="max-w-md md:max-w-lg object-cover"
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
                placeholder="Type here"
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
                ref={captchaRef}
                className="w-full bg-white text-black border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleCaptcha}
                className="btn btn-outline w-full btn-xm my-4 btn-info"
              >
                Verify Captcha
              </button>
            </div>

            <input
              type="submit"
              disabled={btnDisable}
              className="btn w-full bg-[#D1A054] hover:bg-[#8a6020] text-white font-bold py-2 rounded-md "
            />

            {/* New Account Link */}
            <p className="text-sm text-center text-gray-600 mt-4">
              New here?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Create a New Account
              </a>
            </p>

            {/* Social Login */}
            <div className="flex items-center justify-center mt-4 space-x-4">
              {/* Facebook Icon */}
              <a
                href="#"
                className="p-3 rounded-full border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
              >
                <FaFacebookF />
              </a>
              {/* Google Icon */}
              <a
                href="#"
                className="p-3 rounded-full border border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
              >
                <FaGoogle />
              </a>
              {/* Github Icon */}
              <a
                href="#"
                className="p-3 rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black"
              >
                <FaGithub />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
