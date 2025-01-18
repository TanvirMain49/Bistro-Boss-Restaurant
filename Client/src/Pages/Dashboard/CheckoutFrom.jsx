import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cart, refetch] = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();

  // total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[paymentMethod]", paymentMethod);
      setError("");
    }

    // confirmed payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonyms",
            name: user?.displayName || "anonyms",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError, "error");
    }
    if (paymentIntent) {
      console.log(paymentIntent, "payment intent");
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id: ", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user?.email,
          price: totalPrice,
          date: new Date(),
          transactionId: paymentIntent.id,
          cartIds: cart.map((item) => item._id),
          menuIds: cart.map((item) => item.menuId),
          status: "pending",
        };

        // send into database
        const paymentRes = await axiosSecure.post("payment", payment);
        if (paymentRes.data?.paymentRes?.insertedId) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          navigate('/dashboard/paymentHistory')
        }
      }
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="card-element"
            className="block text-gray-700 font-medium text-center mb-2"
          >
            Card Details
          </label>
          <div className="border rounded-md p-4 bg-gray-100 focus-within:ring focus-within:ring-indigo-500">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="country"
            className="block text-gray-700 font-medium mb-2"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            className="w-full p-4 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Bangladesh">Bangladesh</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <input
              type="radio"
              id="card"
              name="payment-method"
              className="mr-2"
              checked
              readOnly
            />
            <label htmlFor="card" className="text-gray-700 font-medium">
              Card
            </label>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="btn bg-[#D1A054] text-white w-full py-3 rounded-md font-medium hover:bg-[#D1A054] transition"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay now
          </button>
        </div>

        {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
        {transactionId && (
          <p className="text-green-500 font-bold mt-4">
            <span className="text-black">Your transaction id: </span>
            {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutFrom;
