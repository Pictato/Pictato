import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dynamoApi } from "../apis/dynamoApi";
import Navbar from "../components/ui/Navbar";

const Gallery = () => {
  const { space } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetRequest();
  }, []);

  const handleGetRequest = async () => {
    const res = await dynamoApi.readAllPost(space);
    setData(res.data.body);
  };

  return (
    <div className="p-4">
      <Navbar space={space} />
      {console.log(data)}
    </div>
  );
};

export default Gallery;
