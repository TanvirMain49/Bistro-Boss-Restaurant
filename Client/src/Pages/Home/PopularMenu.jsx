import React, { useEffect, useState } from "react";
import SectionHeading from "../../Component/SectionHeading";
import MenuCard from "../../Shared/MenuCard";
import UseMenu from "../../Hooks/UseMenu";

const PopularMenu = () => {
  const [menu] = UseMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <div className="mb-12">
      <SectionHeading
        Heading="FROM OUR MENU"
        subHeading="---Check it out---"
      ></SectionHeading>
      <div className="grid grid-cols-2 gap-10 w-8/12 mx-auto">
        {popular.map((item) => (
          <MenuCard key={item._id} item={item}></MenuCard>
        ))}
      </div>
      <div className="flex items-center justify-center my-8">
        <button className="btn border-b-4 rounded-xl border-black uppercase font-semibold">
          View Full menu
        </button>
      </div>
    </div>
  );
};

export default PopularMenu;
