import React from "react";
import SectionHeading from "../../Component/SectionHeading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth";
import { MdDoneOutline, MdOutlinePadding, MdOutlinePending } from "react-icons/md";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`payment/${user?.email}`);
      return res.data;
    },
  });
  console.log(payments);
  return (
    <div>
      <SectionHeading
        Heading="Payment History"
        subHeading="---At a Glance!---"
      ></SectionHeading>
      <div>
        <div className="overflow-x-auto">
          <p className="text-4xl font-semibold">
            Total Payments: {payments.length}
          </p>
          <table className="table rounded-xl text-center text-lg mt-8">
            {/* head */}
            <thead className="bg-[#D1A054] text-white text-lg">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Transaction ID</th>
                <th>Total Price</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, idx) => (
                <tr key={pay._id}>
                  <th>{idx + 1}</th>
                  <td>{pay.email}</td>
                  <td>{pay.transactionId}</td>
                  <td>${pay.price}</td>{" "}
                  {/* Replace with the correct property for total price */}
                  <td>{new Date(pay.date).toLocaleString()}</td>{" "}
                  <td >{pay.status == 'pending' ? <MdOutlinePending className="text-2xl ml-6"></MdOutlinePending> : <MdDoneOutline></MdDoneOutline>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
