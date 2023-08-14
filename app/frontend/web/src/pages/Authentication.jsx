import { useState } from "react";
import SignIn from "../components/authentication/SignIn";
import Register from "../components/authentication/Register";
import Pictato from "../assets/pictato.png";

const tabContents = {
  로그인: <SignIn />,
  회원가입: <Register />,
};

const Authentication = () => {
  const [curTab, setCurTab] = useState("로그인");

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-20 sm:h-24" src={Pictato} alt="Pictato" />
          </div>
          <div className="flex items-center justify-center mt-6">
            {Object.entries(tabContents).map(([key]) => (
              <a
                className={
                  "w-1/3 pb-4 font-medium text-center capitalize " +
                  (key === curTab
                    ? "text-gray-800 border-b-2 border-stone-500 dark:border-gray-400 dark:text-white"
                    : "text-gray-500 border-b dark:border-stone-400 dark:text-gray-300")
                }
                onClick={() => setCurTab(key)}
              >
                {key}
              </a>
            ))}
          </div>
          {tabContents[curTab]}
        </form>
      </div>
    </section>
  );
};

export default Authentication;
