import axios from "axios";

const host = "https://zadatak-kompare-backend.herokuapp.com/api";

export const call = async (method, path, data) => {
  try {
    const response = await axios[method](`${host}/${path}`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};
