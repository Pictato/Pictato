import axios from "axios";

const ROUTE = "gallery";

const s3Instance = axios.create({
  baseURL: "https://nea00qux6d.execute-api.ap-northeast-2.amazonaws.com/dev", // TODO: Add your API Gateway URL
});

// const postImage = async (userId, fileName, formData, idToken, accessToken) => {
//   return await s3Instance.post(
//     `${ROUTE}/${userId}/image?filename=${fileName}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: idToken,
//         "Access-Token": accessToken,
//       },
//     }
//   );
// };

const getImage = async (userId, fileName) => {
  return await s3Instance.get(`${ROUTE}/${userId}/image?filename=${fileName}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//export const s3Api = { postImage, getImage };
export const s3Api = { getImage };
