import axios from "axios";

const host = "http://localhost:8000/api";

export const call = async (method, path, data) => {
  try {
    const response = await axios[method](`${host}/${path}`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};
