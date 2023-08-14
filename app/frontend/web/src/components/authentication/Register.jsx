import { useRef } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../../UserPool";

const Register = () => {
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
      (err, data) => {
        if (err) console.log(err);
        console.log(data);
      }
    );
  };

  return (
    <>
      <div class="relative flex items-center mt-8">
        <span class="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <input
          type="text"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-stone-400 dark:focus:border-stone-300 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="아이디"
          ref={username}
          required
        />
      </div>
      <div class="relative flex items-center mt-4">
        <span class="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
        <input
          type="email"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-stone-400 dark:focus:border-stone-300 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="이메일"
          ref={email}
          required
        />
      </div>
      <div class="relative flex items-center mt-4">
        <span class="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-stone-400 dark:focus:border-stone-300 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="비밀번호"
          ref={password}
          required
        />
      </div>
      <div class="relative flex items-center mt-4">
        <span class="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-stone-400 dark:focus:border-stone-300 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="비밀번호 확인"
          ref={confirmPassword}
          required
        />
      </div>
      <div class="mt-6">
        <button
          class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-stone-500 rounded-lg hover:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          가입하기
        </button>
        <div class="mt-6 text-center ">
          <a
            href="#"
            class="text-sm text-stone-500 hover:underline dark:text-stone-400"
          >
            Already have an account?
          </a>
        </div>
      </div>
    </>
  );
};

export default Register;
