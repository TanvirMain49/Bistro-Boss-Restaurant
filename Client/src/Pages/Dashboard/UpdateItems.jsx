import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import SectionHeading from "../../Component/SectionHeading";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const img_hosting_key = import.meta.env.VITE_IMG_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UpdateItems = () => {
  const {_id, name, price, recipe, category} = useLoaderData();
  const navigate = useNavigate();

  //update form
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imgFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.patch(`menu/${_id}`, menuItem);
      console.log("Update Response:", menuRes.data); 
      if (menuRes.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${name} updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/manageItem');
      }
    }
  };

  return (
    <div>
      <SectionHeading Heading="UPDATE ITEM"></SectionHeading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-x-gray-400 p-8 rounded w-11/12 mx-auto"
      >
        <div className="mb-4">
          <label
            htmlFor="recipe-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Recipe name<span className="text-red-500">*</span>
          </label>
          <input
            defaultValue={name}
            {...register("name", { required: true })}
            type="text"
            placeholder="Recipe name"
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              Category<span className="text-red-500">*</span>
            </label>
            <select
              defaultValue={category}
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soups">Soups</option>
              <option value="dessert">Desserts</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          <div className="mb-4 w-1/2">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={price}
              {...register("price", { required: true })}
              type="text"
              placeholder="Price"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-gray-700 font-bold mb-2"
          >
            Recipe Details<span className="text-red-500">*</span>
          </label>
          <textarea
            defaultValue={recipe}
            {...register("recipe")}
            placeholder="Recipe Details"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
            Upload Image
          </label>
          <input
            {...register("image")}
            type="file"
            className="block w-full text-gray-700 border border-gray-300 rounded py-2 px-3 cursor-pointer focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItems;
