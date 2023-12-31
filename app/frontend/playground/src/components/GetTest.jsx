import { useState, useRef, useContext } from "react";

import { AccountContext } from "../contexts/Account";

import { dynamoApi } from "../apis/dynamoApi";
import { s3Api } from "../apis/s3Api";

const GetTest = () => {
  const { username } = useContext(AccountContext);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const indexRef = useRef("");

  const handleGetRequest = async () => {
    try {
      const res = await dynamoApi.readPost(username, indexRef.current.value);
      setDesc(res.data.body.memo);

      const image = await s3Api.getImage(username, res.data.body["file-name"]);
      setFile(image.data.body);

      alert("GET에 성공했습니다.");
    } catch (err) {
      alert(`GET에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="card w-[369px] h-[585px] bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">DynamoDB & S3</h2>
        <div className="join w-full">
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
