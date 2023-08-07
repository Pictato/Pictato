import { useState, useRef } from "react";

import { s3Api } from "../apis/s3Api";

const GetS3Test = () => {
  const [file, setFile] = useState(null);
  const fileNameRef = useRef("");

  const handleGetRequest = async () => {
    try {
      // getImage 함수의 userId 파라미터에 넣을게 필요한데 여기는 단순히 s3테스트라 괜찮을듯?
      // GetTest.jsx 에서만 userId 잘 넣어주면 될듯
      const res = await s3Api.getImage("test", fileNameRef.current.value);
      setFile(res.data.body);

      alert("GET에 성공했습니다.");
    } catch (err) {
      alert(`GET에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="card min-w-[369px] min-h-[585px] bg-base-100 shadow-xl">
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
