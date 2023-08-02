import { useRef } from "react";

const PostTest = () => {
  const fileRef = useRef(undefined);
  const memoRef = useRef("");

  const handlePost = () => {
    const DYNAMO_DATA = {
      fileName: fileRef.current.files[0].name,
      memo: memoRef.current.value,
    };

    const S3_DATA = fileRef.current.files[0];

    console.log(DYNAMO_DATA);
    console.log(S3_DATA);
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
