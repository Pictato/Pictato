import { useRef, useContext } from "react";

import { AccountContext } from "../contexts/Account";

import { dynamoApi } from "../apis/dynamoApi";
import { s3Api } from "../apis/s3Api";

const PostTest = () => {
  const { username, getIdToken } = useContext(AccountContext);
  const fileRef = useRef(undefined);
  const memoRef = useRef("");

  const handlePostRequest = async () => {
    try {
      const DYNAMO_DATA = {
        fileName: fileRef.current.files[0].name,
        memo: memoRef.current.value,
      };

      const formData = new FormData();
      formData.append("image-file", fileRef.current.files[0]);

      const idToken = await getIdToken();

      await dynamoApi.createPost(username, DYNAMO_DATA, idToken);
      await s3Api.postImage(
        username,
        fileRef.current.files[0].name,
        formData,
        idToken
      );

      alert("POST에 성공했습니다.");
    } catch (err) {
      alert(`POST에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="card w-[369px] h-[585px] bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">DynamoDB & S3</h2>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          ref={fileRef}
        />
        <textarea
          className="textarea textarea-bordered h-full"
          placeholder="Memo"
          ref={memoRef}
        ></textarea>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handlePostRequest}>
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostTest;
