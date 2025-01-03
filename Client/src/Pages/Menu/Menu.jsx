import React from "react";
import { Helmet } from "react-helmet-async";
import SectionCover from "../../Shared/SectionCover";
import img1 from "../../assets/menu/banner3.jpg";
import SectionHeading from "../../Component/SectionHeading";
import PopularMenu from "../Home/PopularMenu";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro | Our menu</title>
      </Helmet>
      
      {/* section----1 */}
      <SectionCover
        img={img1}
        title="OUR MENU"
        subTitle="Would You Like to Try a Dish?"
      ></SectionCover>
      <div className="my-24">
        {/* <SectionHeading Heading="TODAY'S OFFER" subHeading="---Don't miss---"></SectionHeading> */}
        <PopularMenu></PopularMenu>
      </div>

      {/* section----2 */}
      <SectionCover
        img={img1}
        title="OUR MENU"
        subTitle="Would You Like to Try a Dish?"
      ></SectionCover>
      <div className="my-24">
        {/* <SectionHeading Heading="TODAY'S OFFER" subHeading="---Don't miss---"></SectionHeading> */}
        <PopularMenu></PopularMenu>
      </div>

      {/* section----3 */}
      <SectionCover
        img={img1}
        title="OUR MENU"
        subTitle="Would You Like to Try a Dish?"
      ></SectionCover>
      <div className="my-24">
        {/* <SectionHeading Heading="TODAY'S OFFER" subHeading="---Don't miss---"></SectionHeading> */}
        <PopularMenu></PopularMenu>
      </div>
    </div>
  );
};

export default Menu;
