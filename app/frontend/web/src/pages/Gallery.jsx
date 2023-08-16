import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AccountContext from "../contexts/account-context";
import { galleryApi } from "../apis/galleryApi";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          0: 1,
          350: 2,
          700: 3,
          1050: 4,
          1400: 5,
          1750: 6,
        }}
      >
        <Masonry gutter="1rem">
          {gallery.map((piece) => (
            <div
              className="card card-compact rounded-none bg-white shadow-xl"
              key={piece["file-name"]}
            >
              <figure className="px-4 pt-4">
                <img
                  src={`https://team2-icn-pictato-bucket.s3.ap-northeast-2.amazonaws.com/${space}/${piece["file-name"]}`}
                  alt={piece["file-name"]}
                  onError={(event) => (event.target.style.display = "none")}
                />
                <span className="loading loading-ring loading-lg"></span>
              </figure>
              <div className="card-body mt-2 items-end kcc-chassam">
                <div className="flex items-center gap-4">
                  {username === space && (
                    <button
                      className="btn btn-error btn-xs btn-square"
                      onClick={() => {
                        handleDeleteRequest(piece.index);
                      }}
                    >
                      <AiOutlineDelete size="16" />
                    </button>
                  )}
                  <p className="text-xl">{piece.memo}</p>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Gallery;
