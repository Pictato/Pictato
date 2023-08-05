import Main from "./components/Main";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PostTest from "./components/PostTest";
import GetDynamoTest from "./components/GetDynamoTest";
import GetS3Test from "./components/GetS3Test";
import GetTest from "./components/GetTest";

const App = () => {
  return (
    <div className="prose">
      <h1>Authentication</h1>
      <div className="flex p-4 gap-4">
        <Main />
        <SignUp />
        <Login />
      </div>
      <h1>POST</h1>
      <div className="flex p-4 gap-4">
        <PostTest />
      </div>
      <h1>GET</h1>
      <div className="flex p-4 gap-4">
        <GetDynamoTest />
        <GetS3Test />
        <GetTest />
      </div>
    </div>
  );
};

export default App;
