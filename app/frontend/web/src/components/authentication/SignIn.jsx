import { useContext, useRef } from "react";
import AccountContext from "../../contexts/account-context";

const App = () => {
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
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <input
          type="text"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-stone-400 dark:focus:border-stone-300 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="아이디"
          ref={username}
          required
        />
      </div>
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-stone-400 dark:focus:border-stone-300 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="비밀번호"
          ref={password}
          required
        />
      </div>
      <div className="mt-6">
        <button
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-stone-500 rounded-lg hover:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          로그인하기
        </button>
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-stone-500 hover:underline dark:text-stone-400"
          >
            아직 계정이 없으신가요? 회원가입하기
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
