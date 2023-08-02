import { useRef } from "react";

import { dynamoApi } from "../apis/dynamoApi";

const PostTest = () => {
  const fileRef = useRef(undefined);
  const memoRef = useRef("");

  const handlePost = async () => {
    try {
      const DYNAMO_DATA = {
        userId: "test",
        index: "1",
        fileName: fileRef.current.files[0].name,
        memo: memoRef.current.value,
      };

      console.log(await dynamoApi.createPost(DYNAMO_DATA));

      alert("POST에 성공했습니다.");
    } catch (err) {
      alert(`POST에 실패했습니다. (${err})`);
    }

    const S3_DATA = fileRef.current.files[0];
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
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
        <div className="card-actions justify-end" onClick={handlePost}>
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  );
};

export default PostTest;
