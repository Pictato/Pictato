import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountContext from "../contexts/account-context";
import Authentication from "./Authentication";

const Main = () => {
  const navigate = useNavigate();
  const { username, isSignedIn } = useContext(AccountContext);

  useEffect(() => {
    if (isSignedIn) navigate(`/${username}`);
  }, [isSignedIn]);

  return <Authentication />;
};

export default Main;
