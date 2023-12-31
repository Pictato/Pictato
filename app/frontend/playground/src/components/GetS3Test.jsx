import { useState, useRef, useContext } from "react";

import { AccountContext } from "../contexts/Account";

import { s3Api } from "../apis/s3Api";

const GetS3Test = () => {
  const { username } = useContext(AccountContext);
  const [file, setFile] = useState(null);
  const fileNameRef = useRef("");

  const handleGetRequest = async () => {
    try {
      const res = await s3Api.getImage(username, fileNameRef.current.value);
      setFile(res.data.body);

      alert("GET에 성공했습니다.");
    } catch (err) {
      alert(`GET에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="card min-w-[369px] min-h-[585px] bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">S3</h2>
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
        {file !== null && <img src={`data:image/jpeg;base64,${file}`} />}
      </div>
    </div>
  );
};

export default GetS3Test;
