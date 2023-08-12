import { useContext, useState, useEffect } from "react";
import AccountContext from "../contexts/account-context";
import Login from "./Login";

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

  return status ? "Logged in as " + username : <Login />;
};

export default Main;
