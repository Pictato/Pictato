import { useState } from "react";

import Pictato from "../assets/pictato.png";

const Main = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={Pictato} alt="Pictato" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          Pictato
          <div className="badge badge-secondary">Playground</div>
        </h2>
        <p>React playground for Pictato with Amazon Web Services</p>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
