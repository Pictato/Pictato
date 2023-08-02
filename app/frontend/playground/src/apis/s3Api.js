import axios from "axios";

const ROUTE = "";

const s3Instance = axios.create({
  baseURL: "https://",
  headers: {
    AccessControlAllowOrigin: "*",
  },
});

const postImage = async () => {
  return await s3Instance.post();
};

const getImage = async () => {
  return await s3Instance.get();
};

export const s3Api = { postImage, getImage };
