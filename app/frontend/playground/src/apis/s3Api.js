import axios from "axios";

const ROUTE = "image";

const s3Instance = axios.create({
  baseURL:
    "https://52ks59qzm5.execute-api.ap-northeast-2.amazonaws.com/default", // TODO: Add your API Gateway URL
});

const postImage = async (fileName, formData) => {
  return await s3Instance.post(`${ROUTE}?filename=${fileName}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getImage = async (fileName) => {
  return await s3Instance.get(`${ROUTE}?filename=${fileName}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const s3Api = { postImage, getImage };
