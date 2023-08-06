import { useState, useContext } from "react";

import { AccountContext } from "../contexts/Account";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => console.log("Logged in!", data))
      .catch((err) => console.log("Failed to login!", err));
  };

  return (
    <div className="card w-[369px] h-[585px] bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">로그인</h2>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-contro w-full max-w-xs">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-active btn-accent" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
