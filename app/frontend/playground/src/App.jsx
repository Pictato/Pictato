import Main from "./components/Main";
import PostTest from "./components/PostTest";
import GetTest from "./components/GetTest";

const App = () => {
  return (
    <div className="flex p-4 gap-4">
      <Main />
      <PostTest />
      <GetTest />
    </div>
  );
};

export default App;
