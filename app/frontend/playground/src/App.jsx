import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Playground</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>React playground for Pictato with Amazon Web Services</p>
      </div>
    </>
  );
};

export default App;
