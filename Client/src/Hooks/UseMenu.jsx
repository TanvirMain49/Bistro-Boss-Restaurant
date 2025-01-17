import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const UseMenu = () => {
    const axiosPublic = useAxiosPublic();
    const {data: menu=[], isPadding: loader, refetch } = useQuery({
      queryKey:["menu"],
      queryFn: async()=>{
        const res = await axiosPublic.get('menu')
        return res.data;
      }
    })
      return [menu, loader, refetch]
};

export default UseMenu;