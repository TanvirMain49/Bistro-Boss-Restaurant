import { useEffect, useState } from "react";

const UseMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loader, setLoader] = useState(true);
      useEffect(() => {
        fetch("http://localhost:5000/menu")
          .then((res) => res.json())
          .then((data) => {
            setLoader(false);
            setMenu(data);
          });
      }, []);
      return [menu, loader]
};

export default UseMenu;