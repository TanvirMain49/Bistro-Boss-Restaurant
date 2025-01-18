import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://server-psi-sandy.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;