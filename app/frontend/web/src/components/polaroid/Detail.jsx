import { useContext, useState } from "react";
import AccountContext from "../../contexts/account-context";
import { useSpring, animated } from "@react-spring/web";
import { galleryApi } from "../../apis/galleryApi";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1,
];
const trans = (x, y, s) =>
  `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Detail = ({ space, piece }) => {
  const { username, getIdToken, getAccessToken } = useContext(AccountContext);
  const [isFlipped, setIsFlipped] = useState(false);

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 2000, friction: 200 },
  }));

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
    <dialog id={piece["file-name"]} className="modal">
      <form method="dialog" className="flex flex-col items-center">
        <animated.div
          className="[perspective:1000px]"
          onMouseMove={({ clientX: x, clientY: y }) =>
            set.start({ xys: calc(x, y) })
          }
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{
            transform: props.xys.to(trans),
          }}
        >
          <div
            className={`cursor-pointer transition-all duration-500 [transform-style:preserve-3d] card card-compact rounded-none bg-white shadow-xl ${
              isFlipped && "[transform:rotateY(180deg)]"
            }`}
            onClick={() => setIsFlipped((cur) => !cur)}
          >
            <div className="[backface-visibility:hidden]">
              <figure className="px-4 pt-4">
                <img
                  src={`https://team2-icn-pictato-bucket.s3.ap-northeast-2.amazonaws.com/before-resize/${space}/${piece["file-name"]}`}
                  className="max-h-[calc(100vh-400px)]"
                  alt={piece["file-name"]}
                />
              </figure>
              <div className="card-body mt-2 items-end kcc-chassam">
                <p className="text-xl">{piece.memo}</p>
              </div>
            </div>
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="card-body kcc-chassam">
                <p className="truncate">date: {piece.date}</p>
                <p className="truncate">file-name: {piece["file-name"]}</p>
                <p className="truncate">index: {piece.index}</p>
                <p className="truncate">memo: {piece.memo}</p>
                <p className="truncate">owner: {piece["user-id"]}</p>
              </div>
            </div>
          </div>
        </animated.div>
        <div className="modal-action">
          {username === space && (
            <button
              className="btn btn-error"
              onClick={() => {
                handleDeleteRequest(piece.index);
              }}
            >
              <AiOutlineDelete size="16" /> 삭제
            </button>
          )}
          <button className="btn">
            <AiOutlineClose size="16" />
            닫기
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Detail;
