import React from 'react';

const Card = ({ item }) => {
    return (
<div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col grow">
    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
    <div className="p-4 flex flex-col grow">
        <h3 className="text-xl font-semibold mb-2 text-center">{item.name}</h3>
        <p className="text-gray-600 mb-4 text-center">{item.recipe}</p>
        <div className="flex justify-center items-center mt-auto">
            <button className="flex-grow bg-gray-200 border-b-4 border-[#BB8506] text-[#BB8506] font-semibold py-2 px-6 rounded-lg hover:bg-black hover:text-white hover:scale-95 transition-transform">
                Add to Cart
            </button>
        </div>
    </div>
</div>
    );
};

export default Card;
