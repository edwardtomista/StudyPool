import {
    CognitoUser,
    CognitoUserAttribute,
    AuthenticationDetails,
} from "amazon-cognito-identity-js";
import UserPool from "./UserPool.js";

// Cognito should set the attributes (family_name, given_name, and email )
export const signup = (fname, lname, email, password) => {
    let attributeList = [];
    attributeList.push(
        new CognitoUserAttribute({
            Name: "given_name",
            Value: fname,
        })
    );
    attributeList.push(
        new CognitoUserAttribute({
            Name: "family_name",
            Value: lname,
        })
    );
    attributeList.push(
        new CognitoUserAttribute({
            Name: "email",
            Value: email,
        })
    );
    return new Promise((resolve, reject) => {
        UserPool.signUp(email, password, attributeList, null, (err, data) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
};

export const login = (email, password) => {
    const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
    });
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });
    return new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess: ", data);
                resolve(data);
            },
            onFailure: (err) => {
                console.error("onFailure: ", err);
                reject(err);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data);
                resolve(data);
            },
        });
    });
};

export const getSession = () => {
    const user = UserPool.getCurrentUser();
    return new Promise((resolve, reject) => {
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    reject();
                } else {
                    resolve(session);
                }
            });
        } else {
            reject(true);
        }
    });
};

export const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
        user.signOut();
    }
};
