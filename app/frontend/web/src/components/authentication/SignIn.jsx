import { useContext, useRef } from "react";
import AccountContext from "../../contexts/account-context";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const SignIn = ({ onClickRegister }) => {
  const { authenticate } = useContext(AccountContext);
  const username = useRef();
  const password = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    authenticate(username.current.value, password.current.value)
      .then((data) => {
        console.log("Logged in!", data);
        alert("로그인 성공!");
        location.reload();
      })
      .catch((err) => console.log("Failed to login!", err));
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
      <div className="mt-6">
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          로그인하기
        </button>
        <div className="mt-6 text-center">
          아직 계정이 없으신가요?{" "}
          <a className="link link-primary link-hover" onClick={onClickRegister}>
            회원가입하기
          </a>
        </div>
      </div>
    </>
  );
};

export default SignIn;
