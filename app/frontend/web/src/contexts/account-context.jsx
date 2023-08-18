import { createContext, useState, useEffect } from "react";
import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import {
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";

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
    case "UsernameExistsException":
      return "이미 사용 중인 사용자 이름입니다.";
    case "InvalidPasswordException":
      return "유효하지 않은 비밀번호입니다. 비밀번호는 영문, 숫자, 특수 문자를 포함하여야 합니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};

const AccountContext = createContext();

export const AccountContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [message, setMessage] = useState("");

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
          setMessage(getErrorMessage(err.code));
          window.error_modal.showModal();
          reject(err);
        },
        newPasswordRequired: (data) => {
          setMessage("newPasswordRequired: " + data);
          window.warning_modal.showModal();
          resolve(data);
        },
      });
    });
  };

  const signUp = (username, password, confirmPassword, email) => {
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      window.warning_modal.showModal();
      return;
    }

    const attributeData = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    Pool.signUp(username, password, [attributeData], null, (err) => {
      if (err) {
        setMessage(getErrorMessage(err.code));
        window.error_modal.showModal();
      } else {
        setMessage("가입이 완료되었습니다.");
        window.success_modal.showModal();
      }
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
        signUp,
        signOut,
      }}
    >
      {children}
      <dialog id="success_modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="flex flex-col items-center modal-box">
          <AiOutlineCheckCircle color="green" size={64} />
          <p className="py-4">{message}</p>
          <button className="btn" onClick={() => window.location.reload()}>
            확인
          </button>
        </form>
        <form
          method="dialog"
          className="modal-backdrop"
          onSubmit={() => window.location.reload()}
        >
          <button>close</button>
        </form>
      </dialog>
      <dialog id="warning_modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="flex flex-col items-center modal-box">
          <AiOutlineExclamationCircle color="skyblue" size={64} />
          <p className="py-4">{message}</p>
          <button className="btn">확인</button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="error_modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="flex flex-col items-center modal-box">
          <AiOutlineCloseCircle color="red" size={64} />
          <p className="py-4">{message}</p>
          <button className="btn">확인</button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </AccountContext.Provider>
  );
};

export default AccountContext;
