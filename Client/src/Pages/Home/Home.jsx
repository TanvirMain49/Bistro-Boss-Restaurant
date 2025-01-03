import React from "react";
import Banner from "./Banner";
import FoodCategory from "./FoodCategory";
import PopularMenu from "./PopularMenu";
import ChefRecommended from "./ChefRecommended";
import FeatureItem from "./FeatureItem/FeatureItem";
import Review from "./Review";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro | Home</title>
      </Helmet>
      <Banner></Banner>
      <FoodCategory></FoodCategory>
      <PopularMenu></PopularMenu>
      <ChefRecommended></ChefRecommended>
      <FeatureItem></FeatureItem>
      <Review></Review>
    </div>
  );
};

export default Home;
