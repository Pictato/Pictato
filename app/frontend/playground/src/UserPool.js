import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-northeast-2_Ovo61V5vt", // Your user pool id here
  ClientId: "24vrvmerh3itpvt4tnl05tpltu", // Your client id here
};

export default new CognitoUserPool(poolData);
