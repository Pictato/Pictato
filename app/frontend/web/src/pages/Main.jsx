import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountContext from "../contexts/account-context";
import Authentication from "./Authentication";

const Main = () => {
  const navigate = useNavigate();
  const { getSession, setUsername, username } = useContext(AccountContext);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      setUsername(session.idToken.payload["cognito:username"]);
      setStatus(true);
    });
  }, []);

  return status ? navigate(`/${username}`) : <Authentication />;
};

export default Main;
