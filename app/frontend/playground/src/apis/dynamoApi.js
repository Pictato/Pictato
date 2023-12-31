import axios from "axios";

const ROUTE = "gallery";

const dynamoInstance = axios.create({
  baseURL: "https://nea00qux6d.execute-api.ap-northeast-2.amazonaws.com/dev", // TODO: Add your API Gateway URL
});

const createPost = async (userId, data, idToken, accessToken) => {
  return await dynamoInstance.post(`${ROUTE}/${userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: idToken,
      "Access-Token": accessToken,
    },
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

const deletePost = async (userId, index, idToken, accessToken) => {
  return await dynamoInstance.delete(`${ROUTE}/${userId}/${index}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
      "Access-Token": accessToken,
    },
  });
};

export const dynamoApi = { createPost, readAllPost, readPost, deletePost };
