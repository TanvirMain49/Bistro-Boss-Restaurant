import React from 'react';
import Banner from './Banner';
import FoodCategory from './FoodCategory';
import PopularMenu from './PopularMenu';
import ChefRecommended from './ChefRecommended';
import FeatureItem from './FeatureItem/FeatureItem';
import Review from './Review';

const Home = () => {
    return (
        <div>
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