import axios from "axios";

const ROUTE = "user";

const dynamoInstance = axios.create({
  baseURL: "https://a2lvwokvnf.execute-api.ap-northeast-2.amazonaws.com/test", // TODO: Add your API Gateway URL
});

const createPost = async (userId, data) => {
  return await dynamoInstance.post(`${ROUTE}/${userId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

const readPost = async (userId) => {
  return await dynamoInstance.get(`${ROUTE}/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
};

const deletePost = async () => {
  return await dynamoInstance.delete();
};

export const dynamoApi = { createPost, readPost, deletePost };
