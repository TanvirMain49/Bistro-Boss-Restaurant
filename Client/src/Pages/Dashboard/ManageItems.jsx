import React from "react";
import SectionHeading from "../../Component/SectionHeading";
import DataTable from "react-data-table-component";
import UseMenu from "../../Hooks/UseMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [menu, loader, refetch] = UseMenu();
  const axiosSecure = useAxiosSecure();
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      cell: (row, index) => <span className="text-gray-600">{index + 1}</span>,
      grow: 0,
      center: true,
    },
    {
      name: "Item Image",
      cell: (row) => (
        <img
          src={row.image}
          alt={row.name}
          className="w-16 h-16 rounded-md border"
        />
      ),
      grow: 0,
      center: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.name,
      cell: (row) => (
        <span className="font-medium text-gray-800">{row.name}</span>
      ),
    },
    {
      name: "Price",
      selector: (row) => `$${row.price.toFixed(2)}`,
      cell: (row) => (
        <span className="text-green-600 font-medium">
          ${row.price.toFixed(2)}
        </span>
      ),
      grow: 0.5,
      center: true,
    },
    {
      name: "Update",
      cell: (row) => (
        <button
          className="btn text-white bg-[#D1A054] btn-base"
          onClick={() => handleUpdate(row._id)}
        >
          <FaEdit></FaEdit>
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="btn bg-red-500 text-white btn-base"
          onClick={() => handleDelete(row._id)}
        >
          <FaTrashAlt></FaTrashAlt>
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
    },
  ];
  //   table style
  const customStyles = {
    header: {
      style: {
        backgroundColor: "#D1A054",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "10px",
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#D1A054", // Tailwind's bg-yellow-200
        fontWeight: "600",
        color: "white", // Tailwind's text-gray-700
        fontSize: "14px",
        padding: "10px",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        backgroundColor: "white",
        padding: "12px",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        // padding: "10px",
        textAlign: "center",
      },
    },
  };

  // Handlers for Update and Delete actions
  const handleUpdate = (id) => {
    // console.log(`Update item with id: ${id}`);
    // Add your update logic here
  };

  const handleDelete = (id) => {
    console.log(id);
    // Add your delete logic here
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`menu/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div>
      <SectionHeading
        Heading="MANAGE ALL ITEMS"
        subHeading="---Hurry Up!---"
      ></SectionHeading>

      <div className="px-8">
        <DataTable
          columns={columns}
          data={menu} // Replace with fetched data in the future
          pagination // Enables pagination
          highlightOnHover // Highlights rows on hover
          striped // Alternating row colors
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default ManageItems;
