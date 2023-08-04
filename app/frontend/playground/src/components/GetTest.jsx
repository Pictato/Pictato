import { useState, useRef } from "react";

import { dynamoApi } from "../apis/dynamoApi";

const GetTest = () => {
  const [data, setData] = useState([]);
  const userIdRef = useRef("");

  const handleGetRequest = async () => {
    try {
      const res = await dynamoApi.readPost(userIdRef.current.value);
      setData(res.data.body);

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
            <button
              className="btn btn-secondary join-item rounded-r-full"
              onClick={handleGetRequest}
            >
              GET
            </button>
          </div>
        </h2>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Index</th>
              <th>Username</th>
              <th>File</th>
              <th>Memo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={`item-${index}`}>
                <th>{item.index}</th>
                <td>{item["user-id"]}</td>
                <td>{item["file-name"]}</td>
                <td>{item.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetTest;
