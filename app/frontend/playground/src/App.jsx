import Main from "./components/Main";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PostTest from "./components/PostTest";
import GetDynamoTest from "./components/GetDynamoTest";
import GetS3Test from "./components/GetS3Test";
import GetTest from "./components/GetTest";

const App = () => {
  return (
    <>
      <div className="divider text-2xl font-bold">Authentication</div>
      <div className="flex p-4 gap-4">
        <Main />
        <SignUp />
        <Login />
      </div>
      <div className="divider text-2xl font-bold">POST</div>
      <div className="flex p-4 gap-4">
        <PostTest />
      </div>
      <div className="divider text-2xl font-bold">GET</div>
      <div className="flex p-4 gap-4">
        <GetDynamoTest />
        <GetS3Test />
        <GetTest />
      </div>
    </>
  );
};

export default App;
