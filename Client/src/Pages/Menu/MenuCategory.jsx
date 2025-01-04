import React from "react";
import SectionCover from "../../Shared/SectionCover";
import MenuCard from "../../Shared/MenuCard";
import { Link } from "react-router-dom";

const MenuCategory = ({ item, coverImg, title, subTitle }) => {
  return (
    <div className="mb-20">
      <div className="mb-20">
        {title && (
          <SectionCover
            img={coverImg}
            title={title}
            subTitle={subTitle}
          ></SectionCover>
        )}
      </div>
      <div className="grid grid-cols-2 gap-10 w-8/12 mx-auto">
        {item.map((item) => (
          <MenuCard key={item._id} item={item}></MenuCard>
        ))}
      </div>
      {title && (
        <Link
          to={`/order/${title}`}
          className="flex justify-center items-center my-10"
        >
          <button className="btn border-b-4 rounded-xl border-black uppercase font-semibold">
            View Full menu
          </button>
        </Link>
      )}
    </div>
  );
};

export default MenuCategory;
