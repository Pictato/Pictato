import { createContext, useState, useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "UserNotFoundException":
      return "사용자를 찾을 수 없습니다.";
    case "NotAuthorizedException":
      return "아이디 또는 비밀번호가 일치하지 않습니다.";
    case "PasswordResetRequiredException":
      return "비밀번호 재설정이 필요합니다.";
    case "UserNotConfirmedException":
      return "이메일 인증 후 로그인이 가능합니다.";
    case "InvalidParameterException":
      return "모든 필수 정보를 입력해주세요.";
    default:
      return "로그인 오류가 발생했습니다.";
  }
};

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
          alert(getErrorMessage(err.code));
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
