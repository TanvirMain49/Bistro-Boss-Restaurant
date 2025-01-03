import React from "react";

const MenuCard = ({item}) => {
    const{name, image, price, recipe} = item;
  return (
    <div className="flex items-center space-x-4 py-4">
      {/* Icon or Image */}
      <div>
        <img style={{borderRadius:"0 200px 200px 200px"}} src={image} alt="" className="w-32 h-32 bg-gray-300 rounded-full object-cover" />
      </div>

      {/* Menu Details */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-5">
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800 ">
            {name}-------
          </h3>
          {/* Price */}
          <span className="text-yellow-600 text-lg font-medium">${price}</span>
        </div>
        {/* Description */}
        <p className="text-base text-gray-400">
          {recipe}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
