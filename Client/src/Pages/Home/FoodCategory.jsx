// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import img1 from "../../assets/home/slide1.jpg";
import img2 from "../../assets/home/slide2.jpg";
import img3 from "../../assets/home/slide3.jpg";
import img4 from "../../assets/home/slide4.jpg";
import img5 from "../../assets/home/slide5.jpg";
import SectionHeading from "../../Component/SectionHeading";

const FoodCategory = () => {
  return (
    <div className="w-10/12 mx-auto py-12">

        <SectionHeading Heading={'ORDER ONLINE'} subHeading={'---From 11:00am to 10:00pm---'}></SectionHeading>
      <Swiper watchSlidesProgress={true} slidesPerView={3} className="mySwiper">
        <SwiperSlide>
          <img src={img1} alt="" />
          <h3 className="text-4xl uppercase -mt-20 text-white font-semibold text-center opacity-80">Salads</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
          <h3 className="text-4xl uppercase -mt-20 text-white font-semibold text-center opacity-80">Pizzas</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
          <h3 className="text-4xl uppercase -mt-20 text-white font-semibold text-center opacity-80">Soups</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
          <h3 className="text-4xl uppercase -mt-20 text-white font-semibold text-center opacity-80">Cakes</h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
          <h3 className="text-4xl uppercase -mt-20 text-white font-semibold text-center opacity-80">Salads</h3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FoodCategory;
