import React from 'react';
import img from '../../../assets/home/featured.jpg';
import SectionHeading from '../../../Component/SectionHeading';
import './FeatureItem.css';

const FeatureItem = () => {
    return (
        <div className="Feature-section text-white py-16 my-36 bg-fixed">
            <SectionHeading Heading="Featured Item" subHeading="---Check It Out---" />
            
            <div className="flex justify-center items-center w-8/12 mx-auto gap-8">
                <div className="image-container">
                    <img src={img} alt="Featured Item" />
                </div>

                <div className="text-container space-y-3 mb-5">
                    <p className="text-base">March 20, 2023</p>
                    <h4 className="text-xl">WHERE CAN I GET SOME?</h4>
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                    <button className="bg-transparent border-b-2 border-white text-white py-2 px-6 rounded hover:bg-black">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureItem;
