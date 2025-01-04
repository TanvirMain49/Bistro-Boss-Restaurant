import React from "react";
import { Helmet } from "react-helmet-async";
import SectionCover from "../../Shared/SectionCover";
import img1 from "../../assets/menu/banner3.jpg";
import img2 from "../../assets/menu/dessert-bg.jpeg";
import img3 from "../../assets/menu/pizza-bg.jpg";
import img4 from "../../assets/menu/salad-bg.jpg";
import SectionHeading from "../../Component/SectionHeading";
import UseMenu from "../../Hooks/UseMenu";
import MenuCategory from "./MenuCategory";

const Menu = () => {
  const [menu] = UseMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");
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
      <div className="my-12">
        <SectionHeading
          Heading="TODAY'S OFFER"
          subHeading="---Don't miss---"
        ></SectionHeading>
      </div>
      <MenuCategory item={offered}></MenuCategory>
      <MenuCategory
        item={dessert}
        coverImg={img2}
        title="desserts"
        subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>

      <MenuCategory
        item={pizza}
        coverImg={img3}
        title="pizza"
        subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>

      <MenuCategory
        item={salad}
        coverImg={img4}
        title="salad"
        subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>
    </div>
  );
};

export default Menu;
