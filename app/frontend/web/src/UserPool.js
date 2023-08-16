import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-northeast-2_D5cxBbffu",
  ClientId: "6hmt76919mtspbitil42uem3bc",
};

export default new CognitoUserPool(poolData);
