import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dynamoApi } from "../api/dynamoApi";

const Gallery = () => {
  const { username } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetRequest();
  }, []);

  const handleGetRequest = async () => {
    const res = await dynamoApi.readAllPost(username);
    setData(res.data.body);
  };

  return console.log(data);
};

export default Gallery;
