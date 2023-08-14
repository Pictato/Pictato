import { useState } from "react";
import SignIn from "../components/authentication/SignIn";
import Register from "../components/authentication/Register";
import Pictato from "../assets/pictato.png";

const Authentication = () => {
  const [curTab, setCurTab] = useState("로그인");

  const handleClickRegister = () => {
    setCurTab("회원가입");
  };

  const handleClickSignIn = () => {
    setCurTab("로그인");
  };

  const tabContents = {
    로그인: <SignIn onClickRegister={handleClickRegister} />,
    회원가입: <Register onClickSignIn={handleClickSignIn} />,
  };

  return (
    <section className="bg-base-100">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="form-control w-full max-w-md">
          <div className="flex justify-center">
            <img className="w-auto h-20 sm:h-24" src={Pictato} alt="Pictato" />
          </div>
          <div className="tabs justify-center mt-6">
            {Object.entries(tabContents).map(([key]) => (
              <a
                key={key}
                className={
                  "tab tab-lg tab-bordered w-1/3 " +
                  (key === curTab && "tab-active")
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
