import axios from "axios";

const ROUTE = "gallery";

const instance = axios.create({
  baseURL: "https://nea00qux6d.execute-api.ap-northeast-2.amazonaws.com/dev",
});

const getAllPosts = async (userId) => {
  return await instance.get(`${ROUTE}/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
};

export const galleryApi = { getAllPosts };
