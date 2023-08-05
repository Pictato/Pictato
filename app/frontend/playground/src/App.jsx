import Main from "./components/Main";
import PostTest from "./components/PostTest";
import GetDynamoTest from "./components/GetDynamoTest";
import GetS3Test from "./components/GetS3Test";
import GetTest from "./components/GetTest";

const App = () => {
  return (
    <div className="flex p-4 gap-4">
      <Main />
      <PostTest />
      <GetDynamoTest />
      <GetS3Test />
      <GetTest />
    </div>
  );
};

export default App;
