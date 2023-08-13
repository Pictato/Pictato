import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountContext from "../contexts/account-context";
import Authenticate from "./Authenticate";

const Main = () => {
  const navigate = useNavigate();
  const { getSession, setUsername, username } = useContext(AccountContext);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setUsername(session.idToken.payload["cognito:username"]);
      setStatus(true);
    });
  }, []);

  return status ? navigate(`/${username}`) : <Authenticate />;
};

export default Main;
