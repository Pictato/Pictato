import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "", // Your user pool id here
  ClientId: "", // Your client id here
};

export default new CognitoUserPool(poolData);
