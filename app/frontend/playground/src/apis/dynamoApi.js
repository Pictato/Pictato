import axios from "axios";

const ROUTE = "user";

const dynamoInstance = axios.create({
  baseURL: "https://vm3yzyk2a6.execute-api.ap-northeast-2.amazonaws.com", // TODO: Add your API Gateway URL
});

const createPost = async (data) => {
  return await dynamoInstance.post(`${ROUTE}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

const readPost = async (userId) => {
  return await axios.get(
    `https://a2lvwokvnf.execute-api.ap-northeast-2.amazonaws.com/test/user/${userId}`, // API Gateway 통합 필요
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

const deletePost = async () => {
  return await dynamoInstance.delete();
};

export const dynamoApi = { createPost, readPost, deletePost };
