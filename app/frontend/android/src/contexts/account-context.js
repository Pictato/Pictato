import React, { useState, createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"; // 해당 패키지가 React Native에서 지원되는지 확인해야 합니다.
import Pool from "../UserPool"; // UserPool 경로 설정에 따라 수정

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
          console.log("onSuccess: ", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
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
