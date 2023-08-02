import axios from "axios";

const ROUTE = "user";

const dynamoInstance = axios.create({
  baseURL: "", // TODO: Add your API Gateway URL
});

const createPost = async (data) => {
  return await dynamoInstance.post(`${ROUTE}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

const readPost = async () => {
  return await dynamoInstance.get();
};

const deletePost = async () => {
  return await dynamoInstance.delete();
};

export const dynamoApi = { createPost, readPost, deletePost };
