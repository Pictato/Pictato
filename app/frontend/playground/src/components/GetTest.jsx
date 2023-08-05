import { useState, useRef } from "react";

import { dynamoApi } from "../apis/dynamoApi";
import { s3Api } from "../apis/s3Api";

const GetTest = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const userIdRef = useRef("");
  const indexRef = useRef("");

  const handleGetRequest = async () => {
    try {
      const res = await dynamoApi.readPost(
        userIdRef.current.value,
        indexRef.current.value
      );
      setDesc(res.data.body.memo);

      const image = await s3Api.getImage(res.data.body["file-name"]);
      setFile(image.data["body-json"].body);

      alert("GET에 성공했습니다.");
    } catch (err) {
      alert(`GET에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <div className="join w-full">
            <input
              className="input input-bordered join-item w-full"
              placeholder="Username"
              ref={userIdRef}
            />
            <input
              className="input input-bordered join-item w-full"
              placeholder="Index"
              ref={indexRef}
            />
            <button
              className="btn btn-secondary join-item rounded-r-full"
              onClick={handleGetRequest}
            >
              GET
            </button>
          </div>
        </h2>
        {file !== null && (
          <>
            <img src={`data:image/jpeg;base64,${file}`} />
            <p>{desc}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GetTest;
