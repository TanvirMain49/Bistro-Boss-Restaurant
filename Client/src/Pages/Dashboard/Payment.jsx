import SectionHeading from "../../Component/SectionHeading";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFrom from "./CheckoutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Payment = () => {
    return (
        <div>
            <SectionHeading Heading="Payment"></SectionHeading>
            <div>
               <Elements stripe={stripePromise}>
                    <CheckoutFrom></CheckoutFrom>
               </Elements>
            </div>
        </div>
    );
};

export default Payment;