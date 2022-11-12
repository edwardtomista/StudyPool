import { CognitoUserPool } from "amazon-cognito-identity-js";
// user pool info
const poolData = {
  UserPoolId: "us-east-1_BC9UIUN3W",
  ClientId: "167mae9lh5otjbml08e224ftlr",
};

export default new CognitoUserPool(poolData);
