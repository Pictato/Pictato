import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-northeast-2_Ji4iOBdqz", // Your user pool id here
  ClientId: "1hdhfrc1tuca16q5kip5l3vame", // Your client id here
};

export default new CognitoUserPool(poolData);
