import axios from "axios";

const ROUTE = "gallery";

const dynamoInstance = axios.create({
  baseURL: "", // TODO: Add your API Gateway URL
});

const createPost = async (userId, data) => {
  return await dynamoInstance.post(`${ROUTE}/${userId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

const readAllPost = async (userId) => {
  return await dynamoInstance.get(`${ROUTE}/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
};

const readPost = async (userId, index) => {
  return await dynamoInstance.get(`${ROUTE}/${userId}/${index}`, {
    headers: { "Content-Type": "application/json" },
  });
};

const deletePost = async () => {
  return await dynamoInstance.delete();
};

export const dynamoApi = { createPost, readAllPost, readPost, deletePost };
