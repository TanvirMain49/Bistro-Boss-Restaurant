import React, { useState } from "react";
import SectionHeading from "../../Component/SectionHeading";
import { useForm } from "react-hook-form";

const AddItems = () => {
  const [item, setItem] = useState({})
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setItem(data);
  };
  console.log(item);
  return (
    <div>
      <SectionHeading
        Heading="---What's new?---"
        subHeading="ADD AN ITEM"
      ></SectionHeading>

      <form onSubmit={handleSubmit(onSubmit)}  
       className="bg-white border border-x-gray-400 p-8 rounded w-11/12 mx-auto">
        <div className="mb-4">
          <label
            htmlFor="recipe-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Recipe name<span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
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
            <select className="select select-bordered w-full">
              <option {...register("category")} disabled selected>
                Category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soups">Soups</option>
              <option value="desserts">Desserts</option>
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
              {...register("price")}
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
            {...register("details")}
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
            id="file"
            type="file"
            className="block w-full text-gray-700 border border-gray-300 rounded py-2 px-3 cursor-pointer focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Item 🍴
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItems;
