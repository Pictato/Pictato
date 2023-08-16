import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AccountContext from "../contexts/account-context";
import { galleryApi } from "../apis/galleryApi";
import Navbar from "../components/ui/Navbar";
import { AiOutlineDelete } from "react-icons/ai";
import "../styles/kccchassam.css";

const Gallery = () => {
  const { space } = useParams();
  const { username, getIdToken, getAccessToken } = useContext(AccountContext);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await galleryApi.getAllPolaroids(space);
      setGallery(res.data.body);
    };

    fetchGallery();
  }, [space]);

  const handleDeleteRequest = async (index) => {
    const idToken = await getIdToken();
    const accessToken = await getAccessToken();

    try {
      await galleryApi.deletePolaroid(username, index, idToken, accessToken);
      window.location.reload();
    } catch (err) {
      alert(`DELETE에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 preview">
      <Navbar space={space} />
      <div className="flex flex-wrap items-start gap-4">
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
            <div className="card-body mt-2 items-end kcc-chassam">
              <div className="flex items-center gap-4">
                {username === space && (
                  <button
                    className="btn btn-error btn-square"
                    onClick={() => {
                      handleDeleteRequest(piece.index);
                    }}
                  >
                    <AiOutlineDelete size="24" />
                  </button>
                )}
                <p className="text-xl">{piece.memo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
