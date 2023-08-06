import { useState, useContext, useEffect } from "react";

import { AccountContext } from "../contexts/Account";

import SignUp from "./SignUp";
import Login from "./Login";

const LoginStatus = () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setStatus(true);
    });
  }, []);

  return (
    <div>
      {status ? (
        <div className="card w-[369px] h-[585px] bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">환영합니다!</h2>
            <div className="card-actions">
              <button className="btn btn-accent w-full" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <SignUp />
          <Login />
        </div>
      )}
    </div>
  );
};

export default LoginStatus;
