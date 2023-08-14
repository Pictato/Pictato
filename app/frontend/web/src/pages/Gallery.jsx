import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AccountContext from "../contexts/account-context";
import { dynamoApi } from "../apis/dynamoApi";
import Navbar from "../components/ui/Navbar";

const Gallery = () => {
  const { space } = useParams();

  const { getSession, setUsername } = useContext(AccountContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getSession().then((session) => {
      setUsername(session.idToken.payload["cognito:username"]);
    });
  }, []);

  useEffect(() => {
    handleGetRequest();
  }, []);

  const handleGetRequest = async () => {
    const res = await dynamoApi.readAllPost(space);
    setData(res.data.body);
  };

  return (
    <div className="p-4">
      <Navbar space={space} />
      {console.log(data)}
    </div>
  );
};

export default Gallery;
