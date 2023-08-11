import { useState, useContext } from "react";

import { AccountContext } from "../contexts/Account";

import { dynamoApi } from "../apis/dynamoApi";

const GetDynamoTest = () => {
  const { username, getIdToken, getAccessToken } = useContext(AccountContext);
  const [data, setData] = useState([]);

  const handleGetRequest = async () => {
    try {
      const res = await dynamoApi.readAllPost(username);
      setData(res.data.body);

      alert("GET에 성공했습니다.");
    } catch (err) {
      alert(`GET에 실패했습니다. (${err})`);
    }
  };

  const handleDelete = async (userId, index) => {
    const idToken = await getIdToken();
    const accessToken = await getAccessToken();

    try {
      await dynamoApi.deletePost(userId, index, idToken, accessToken);
      const res = await dynamoApi.readAllPost(userId);
      setData(res.data.body);

      alert("DELETE에 성공했습니다.");
    } catch (err) {
      alert(`DELETE에 실패했습니다. (${err})`);
    }
  };

  return (
    <div className="card min-w-[369px] min-h-[585px] bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">DynamoDB</h2>
        <button className="btn btn-secondary" onClick={handleGetRequest}>
          GET
        </button>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Index</th>
              <th>Username</th>
              <th>File</th>
              <th>Memo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={`item-${index}`}>
                <th>{item.index}</th>
                <td>{item["user-id"]}</td>
                <td>{item["file-name"]}</td>
                <td>{item.memo}</td>
                <td>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => handleDelete(item["user-id"], item.index)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetDynamoTest;
