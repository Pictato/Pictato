import { useContext, useState, useEffect } from "react";
import AccountContext from "../contexts/account-context";
import Authenticate from "./Authenticate";

const Main = () => {
  const { getSession, setUsername, username } = useContext(AccountContext);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setUsername(session.idToken.payload["cognito:username"]);
      setStatus(true);
    });
  }, []);

  return status ? "Logged in as " + username : <Authenticate />;
};

export default Main;
