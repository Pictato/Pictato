import { createContext, useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";

const AccountContext = createContext();

export const AccountContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    getSession()
      .then((session) => {
        setUsername(session.idToken.payload["cognito:username"]);
        setIsSignedIn(true);
      })
      .catch(() => {
        setUsername("");
        setIsSignedIn(false);
      });
  }, []);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();

      if (user) {
        user.getSession((err, session) => {
          if (err) reject();
          else resolve(session);
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          alert("onFailure: " + err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          alert("newPasswordRequired: " + data);
          resolve(data);
        },
      });
    });
  };

  const signOut = () => {
    const user = Pool.getCurrentUser();
    if (user) user.signOut();
    setIsSignedIn(false);
  };

  const getAccessToken = async () =>
    await getSession().then((session) => session.accessToken.jwtToken);

  const getIdToken = async () =>
    await getSession().then((session) => session.idToken.jwtToken);

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        username,
        isSignedIn,
        setUsername,
        getAccessToken,
        getIdToken,
        signOut,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
