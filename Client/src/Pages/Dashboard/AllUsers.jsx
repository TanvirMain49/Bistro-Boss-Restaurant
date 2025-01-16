import React from "react";
import SectionHeading from "../../Component/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdAdminPanelSettings } from "react-icons/md";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} is admin now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (userId) => {
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
          axiosSecure.delete(`users/${userId}`).then((res) => {
            if (res.data.deletedCount > 0) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "User has been deleted.",
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
            text: "User is not deleted:)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <SectionHeading
        Heading="---How many??---"
        subHeading="MANAGE ALL USERS"
      ></SectionHeading>

      <div>
        <h1 className="text-3xl font-semibold titleFont">
          Total user: {users.length}
        </h1>
        <div className="overflow-x-auto rounded-xl mt-6">
          <table className="table text-center">
            {/* head */}
            <thead className="bg-[#D1A054] text-white">
              <tr>
                <th></th>
                <th className="text-base font-semibold">Name</th>
                <th className="text-base font-semibold">Email</th>
                <th className="text-base font-semibold">Role</th>
                <th className="text-base font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr className="bg-base-200" key={user._id}>
                  <th>{idx + 1}</th>
                  <td className="text-base font-semibold">{user.name}</td>
                  <td className="text-base font-semibold">{user.email}</td>
                  <td>
                    {user.role === "Admin" ? (
                      <div
                        className="btn bg-[#D1A054] text-white text-2xl"
                      >
                        <MdAdminPanelSettings></MdAdminPanelSettings>
                      </div>
                    ) : (
                      <button
                        onClick={()=>handleMakeAdmin(user)}
                        className="btn bg-[#D1A054] text-white text-2xl"
                      >
                        <FaUsers></FaUsers>
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn bg-red-500 text-white text-xl"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
