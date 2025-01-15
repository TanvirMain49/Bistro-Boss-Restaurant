import React from "react";
import SectionHeading from "../../Component/SectionHeading";
import useCart from "../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`carts/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            refetch();
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <SectionHeading Heading="---My Cart---" subHeading="WANNA ADD MORE?" />
      <div className="flex justify-evenly items-center">
        <h3 className="text-3xl font-semibold">Total orders: {cart.length}</h3>
        <h3 className="text-3xl font-semibold">total price: ${totalPrice}</h3>
        <button className="btn bg-[#D1A054] text-white">Pay</button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto mt-10 px-20">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] text-white text-center">
            <tr>
              <th>
                <p>#</p>
              </th>
              <th>Image</th>
              <th>Item name</th>
              <th>Item price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cart.map((item, idx) => (
              <tr>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center justify-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 ">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-base bg-red-500 text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
