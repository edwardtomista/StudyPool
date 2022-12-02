import { CognitoUserPool } from "amazon-cognito-identity-js";
// user pool info
const poolData = {
    UserPoolId: "us-east-1_9ZzFJBqsC", // AWS Cognito Userpool ID
    ClientId: "6gn9ic3gsnntfeek7pt5m8jsrd", // AWS Cognito Client ID
};

export default new CognitoUserPool(poolData);
