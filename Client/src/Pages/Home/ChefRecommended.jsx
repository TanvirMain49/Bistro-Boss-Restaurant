import React, { useEffect, useState } from "react";
import SectionHeading from "../../Component/SectionHeading";
import Card from "../../Shared/Card";

const ChefRecommended = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popular = data.filter((item) => item.category === "offered");
        setMenu(popular);
      });
  }, []);
  return (
    <div className="my-20">
      <SectionHeading
        Heading="CHEF RECOMMENDS"
        subHeading="---Should Try---"
      ></SectionHeading>
      <div className="grid grid-cols-4 gap-8 my-8 w-10/12 mx-auto">
        {
            menu.map(item =><Card key={item._id} item={item}></Card>)
        }
      </div>
    </div>
  );
};

export default ChefRecommended;
