import axios from "axios";

const ROUTE = "";

const s3Instance = axios.create({
  baseURL:
    "https://52ks59qzm5.execute-api.ap-northeast-2.amazonaws.com/default",
});

const postImage = async (fileName, formData) => {
  return await s3Instance.post(`/image?filename=${fileName}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getImage = async (fileName) => {
  return await s3Instance.get(`/image?filename=${fileName}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const s3Api = { postImage, getImage };
