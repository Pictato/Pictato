import { useRef } from "react";

import { dynamoApi } from "../apis/dynamoApi";

const PostTest = () => {
  const userIdRef = useRef("");
  const indexRef = useRef(0);
  const fileRef = useRef(undefined);
  const memoRef = useRef("");

  const handlePostRequest = async () => {
    try {
      const DYNAMO_DATA = {
        userId: userIdRef.current.value,
        index: indexRef.current.value,
        fileName: fileRef.current.files[0].name,
        memo: memoRef.current.value,
      };

      await dynamoApi.createPost(DYNAMO_DATA);

      alert("POST에 성공했습니다.");
    } catch (err) {
      alert(`POST에 실패했습니다. (${err})`);
    }

    const S3_DATA = fileRef.current.files[0];
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex-col">
          <input
            className="input input-bordered w-full"
            placeholder="Username"
            ref={userIdRef}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Index"
            ref={indexRef}
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
        <div className="card-actions justify-end" onClick={handlePostRequest}>
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  );
};

export default PostTest;
