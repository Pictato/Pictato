import { useRef } from "react";

import { dynamoApi } from "../apis/dynamoApi";
import { s3Api } from "../apis/s3Api";

const PostTest = () => {
  const userIdRef = useRef("");
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

      await dynamoApi.createPost(userIdRef.current.value, DYNAMO_DATA);
      await s3Api.postImage(
        userIdRef.current.value,
        fileRef.current.files[0].name,
        formData
      );

      alert("POST에 성공했습니다.");
    } catch (err) {
      alert(`POST에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="card w-[369px] h-[585px] bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex-col">
          <input
            className="input input-bordered w-full"
            placeholder="Username"
            ref={userIdRef}
          />
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            ref={fileRef}
          />
        </h2>
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
