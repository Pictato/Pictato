import { useContext, useRef } from "react";
import AccountContext from "../../contexts/account-context";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Register = ({ onClickSignIn }) => {
  const { signUp } = useContext(AccountContext);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    signUp(
      username.current.value,
      password.current.value,
      confirmPassword.current.value,
      email.current.value
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
