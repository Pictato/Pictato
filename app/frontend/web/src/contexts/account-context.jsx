import { useState, createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";

const AccountContext = createContext();

export const AccountContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");

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

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) user.signOut();
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
        setUsername,
        getAccessToken,
        getIdToken,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
