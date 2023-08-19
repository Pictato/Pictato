import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { galleryApi } from "../apis/galleryApi";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from "../components/ui/Navbar";
import Detail from "../components/polaroid/Detail";
import "../styles/kccchassam.css";

const Gallery = () => {
  const { space } = useParams();
  const [gallery, setGallery] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const fetchMonthGallery = async () => {
      const res = await galleryApi.getMonthPolaroids(
        space,
        new Date().getFullYear(),
        month
      );
      setGallery(res.data.body);
    };

    const fetchAllGallery = async () => {
      const res = await galleryApi.getAllPolaroids(space);
      setGallery(res.data.body);
    };

    month === "all" ? fetchAllGallery() : fetchMonthGallery();
  }, [space, month]);

  return (
    <div className="flex flex-col gap-4 p-4 preview">
      <Navbar space={space} />
      <div>
        <select
          className="select select-ghost text-4xl"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
        >
          {[...Array(12).keys()]
            .filter((_, index) => index < new Date().getMonth() + 1)
            .map((month) => (
              <option key={month} value={month + 1}>
                {month + 1}월
              </option>
            ))}
          <option key="all" value="all">
            전체
          </option>
        </select>
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          0: 1,
          350: 2,
          700: 3,
          1050: 4,
          1400: 5,
          1750: 6,
          2100: 7,
          2450: 8,
          2800: 9,
        }}
      >
        <Masonry gutter="1rem">
          {gallery.map((piece) => (
            <div
              className="card card-compact rounded-none bg-white shadow-xl cursor-pointer"
              key={piece["file-name"]}
              onClick={() => {
                window[piece["file-name"]].showModal();
              }}
            >
              <figure className="px-4 pt-4">
                <img
                  src={`${import.meta.env.VITE_S3_URL}/${space}/${
                    piece["file-name"]
                  }`}
                  width="300"
                  onError={(event) => {
                    event.target.src = `https://team2-icn-pictato-bucket.s3.ap-northeast-2.amazonaws.com/before-resize/${space}/${piece["file-name"]}`;
                  }}
                />
              </figure>
              <div className="card-body mt-2 items-end kcc-chassam">
                <p className="text-xl">{piece.memo}</p>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {gallery.map((piece) => (
        <Detail
          key={`modal_${piece["file-name"]}`}
          space={space}
          piece={piece}
        />
      ))}
    </div>
  );
};

export default Gallery;
