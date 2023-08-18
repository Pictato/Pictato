import axios from "axios";

const ROUTE = "gallery";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const postPolaroid = async (userId, data, idToken, accessToken) => {
  return await instance.post(`${ROUTE}/${userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: idToken,
      "Access-Token": accessToken,
    },
  });
};

const getAllPolaroids = async (userId) => {
  return await instance.get(`${ROUTE}/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
};

const getMonthPolaroids = async (userId, year, month) => {
  return await instance.get(
    `${ROUTE}/${userId}/sort?year=${year}&month=${month}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

const deletePolaroid = async (userId, index, idToken, accessToken) => {
  return await instance.delete(`${ROUTE}/${userId}/${index}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
      "Access-Token": accessToken,
    },
  });
};

export const galleryApi = {
  postPolaroid,
  getAllPolaroids,
  getMonthPolaroids,
  deletePolaroid,
};
