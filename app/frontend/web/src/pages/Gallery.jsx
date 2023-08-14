import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { galleryApi } from "../apis/galleryApi";
import Navbar from "../components/ui/Navbar";
import "../styles/kccchassam.css";

const Gallery = () => {
  const { space } = useParams();

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await galleryApi.getAllPosts(space);
      setGallery(res.data.body);
    };

    fetchGallery();
  }, [space]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Navbar space={space} />
      <div className="flex">
        {gallery.map((piece) => (
          <div
            className="card card-compact rounded-none bg-white shadow-xl"
            key={piece["file-name"]}
          >
            <figure className="px-4 pt-4">
              <img
                src={`https://team2-icn-pictato-bucket.s3.ap-northeast-2.amazonaws.com/${space}/${piece["file-name"]}`}
                alt={piece["file-name"]}
              />
            </figure>
            <div className="card-body mt-6 items-end kcc-chassam">
              <p className="text-xl">{piece.memo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
