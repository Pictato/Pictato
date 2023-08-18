import { useRef } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import UserPool from "../../UserPool";

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "UsernameExistsException":
      return "이미 사용 중인 사용자 이름입니다.";
    case "InvalidParameterException":
      return "모든 필수 정보를 입력해주세요.";
    case "InvalidPasswordException":
      return "유효하지 않은 비밀번호입니다. 비밀번호는 영문, 숫자, 특수 문자를 포함하여야 합니다.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};

const Register = ({ onClickSignIn }) => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const attributeData = new CognitoUserAttribute({
      Name: "email",
      Value: email.current.value,
    });

    UserPool.signUp(
      username.current.value,
      password.current.value,
      [attributeData],
      null,
      (err) => {
        err
          ? alert(getErrorMessage(err.code))
          : alert("가입이 완료되었습니다.").then(window.location.reload());
      }
    );
  };

  return (
    <>
      <div className="relative flex items-center mt-8">
        <span className="absolute px-3">
          <AiOutlineUser size={24} />
        </span>
        <input
          type="text"
          className="input input-bordered w-full block px-12"
          placeholder="아이디"
          ref={username}
          required
        />
      </div>
      <div className="relative flex items-center mt-4">
        <span className="absolute px-3">
          <AiOutlineMail size={24} />
        </span>
        <input
          type="email"
          className="input input-bordered w-full block px-12"
          placeholder="이메일"
          ref={email}
          required
        />
      </div>
      <div className="relative flex items-center mt-4">
        <span className="absolute px-3">
          <AiOutlineLock size={24} />
        </span>
        <input
          type="password"
          className="input input-bordered w-full block px-12"
          placeholder="비밀번호"
          ref={password}
          required
        />
      </div>
      <div className="relative flex items-center mt-4">
        <span className="absolute px-3">
          <AiOutlineLock size={24} />
        </span>
        <input
          type="password"
          className="input input-bordered w-full block px-12"
          placeholder="비밀번호 확인"
          ref={confirmPassword}
          required
        />
      </div>
      <div className="mt-6">
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          가입하기
        </button>
        <div className="mt-6 text-center">
          <a className="link link-primary link-hover" onClick={onClickSignIn}>
            이미 계정이 있으신가요?
          </a>
        </div>
      </div>
    </>
  );
};

export default Register;
