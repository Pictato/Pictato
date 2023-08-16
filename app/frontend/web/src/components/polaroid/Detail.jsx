import { useContext } from "react";
import AccountContext from "../../contexts/account-context";
import { galleryApi } from "../../apis/galleryApi";
import { AiOutlineDelete } from "react-icons/ai";

const Detail = ({ space, piece }) => {
  const { username, getIdToken, getAccessToken } = useContext(AccountContext);

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
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <img
          src={`https://team2-icn-pictato-bucket.s3.ap-northeast-2.amazonaws.com/${space}/${piece["file-name"]}`}
        />
        <p>date: {piece.date}</p>
        <p>file-name: {piece["file-name"]}</p>
        <p>index: {piece.index}</p>
        <p>memo: {piece.memo}</p>
        <p>owner: {piece["user-id"]}</p>
        {username === space && (
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => {
                handleDeleteRequest(piece.index);
              }}
            >
              <AiOutlineDelete size="16" /> 삭제
            </button>
          </div>
        )}
      </form>
    </dialog>
  );
};

export default Detail;
