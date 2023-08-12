import { useContext, useRef } from "react";
import AccountContext from "../contexts/account-context";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const App = () => {
  const { authenticate } = useContext(AccountContext);
  const username = useRef("");
  const password = useRef("");

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
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-stone-500 sm:text-3xl">
          Pictato
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Pictato는 온라인 공유 사진첩 서비스입니다.
          <br />
          사진을 업로드하고, 친구들과 공유하세요.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">로그인</p>
          <div>
            <label htmlFor="text" className="sr-only">
              아이디
            </label>
            <div className="relative">
              <input
                type="text"
                ref={username}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="아이디"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AiOutlineUser size="16" />
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <div className="relative">
              <input
                type="password"
                ref={password}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="비밀번호"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AiOutlineLock size="16" />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-stone-500 px-5 py-3 text-sm font-medium text-white"
          >
            로그인하기
          </button>
          <p className="text-center text-sm text-gray-500">
            아직 계정이 없으신가요?{" "}
            <a className="underline" href="">
              회원가입하기
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default App;
