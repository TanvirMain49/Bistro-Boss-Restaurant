import React from "react";
import { Parallax, Background } from 'react-parallax';

const SectionCover = ({ img, title, subTitle }) => {
  return (
    <Parallax
      blur={{ min: -13, max: 15 }}
      bgImage={`${img}`}
      bgImageAlt="the dog"
      strength={-200}
    >
      <div
        className="hero h-[660px]"
      >
        <div className="hero-content titleFont text-center text-white">
          <div className="hero-overlay bg-opacity-70 p-24">
            <h1 className="mb-5 text-8xl font-bold uppercase">{title}</h1>
            <p className="mb-5 text-3xl font-bold">{subTitle}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default SectionCover;
