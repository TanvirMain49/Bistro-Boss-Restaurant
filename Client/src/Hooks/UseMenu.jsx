import { useEffect, useState } from "react";

const UseMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loader, setLoader] = useState(true);
      useEffect(() => {
        fetch("menu.json")
          .then((res) => res.json())
          .then((data) => {
            setLoader(false);
            setMenu(data);
          });
      }, []);
      return [menu, loader]
};

export default UseMenu;