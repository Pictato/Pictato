import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { galleryApi } from "../apis/galleryApi";
import Navbar from "../components/ui/Navbar";

const Gallery = () => {
  const { space } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetRequest();
  }, []);

  const handleGetRequest = async () => {
    const res = await galleryApi.getAllPosts(space);
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
