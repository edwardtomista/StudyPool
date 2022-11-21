import { CognitoUserPool } from "amazon-cognito-identity-js";
// user pool info
const poolData = {
    UserPoolId: "us-west-2_Bok9lYpqq", // AWS Cognito Userpool ID
    ClientId: "223kfgo93tqbsupl5ogu78ahuk", // AWS Cognito Client ID
};

export default new CognitoUserPool(poolData);
