import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://courier-server-six.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
