import { Account } from "./contexts/Account.jsx";

import LoginStatus from "./components/LoginStatus";
import Main from "./components/Main";
import PostTest from "./components/PostTest";
import GetDynamoTest from "./components/GetDynamoTest";
import GetS3Test from "./components/GetS3Test";
import GetTest from "./components/GetTest";

const App = () => {
  return (
    <Account>
      <div className="divider text-2xl font-bold">Authentication</div>
      <div className="flex p-4 gap-4">
        <Main />
        <LoginStatus />
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
    </Account>
  );
};

export default App;
