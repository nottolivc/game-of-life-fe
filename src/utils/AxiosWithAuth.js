import axios from "axios";

export const AxiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://young-island-96277.herokuapp.com/auth/",
    headers: {
      Authorization: token,
    },
  });
};
