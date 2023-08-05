import { useState, useRef } from "react";

import { s3Api } from "../apis/s3Api";

const GetS3Test = () => {
  const [file, setFile] = useState(null);
  const fileNameRef = useRef("");

  const handleGetRequest = async () => {
    try {
      const res = await s3Api.getImage(fileNameRef.current.value);
      setFile(res.data["body-json"].body);

      alert("GET에 성공했습니다.");
    } catch (err) {
      alert(`GET에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="card w-[369px] h-[585px] bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <div className="join w-full">
            <input
              className="input input-bordered join-item w-full"
              placeholder="File Name"
              ref={fileNameRef}
            />
            <button
              className="btn btn-secondary join-item rounded-r-full"
              onClick={handleGetRequest}
            >
              GET
            </button>
          </div>
        </h2>
        {file !== null && <img src={`data:image/jpeg;base64,${file}`} />}
      </div>
    </div>
  );
};

export default GetS3Test;
