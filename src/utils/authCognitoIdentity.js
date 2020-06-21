//import AWS from 'aws-sdk';
//import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { saveToken } from './utility';

/*const poolData = {
    UserPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
    ClientId: process.env.REACT_APP_AUTH_CLIENT_ID
};
*/
//const userPool = new CognitoUserPool(poolData);

var cognitoUser, sessionUserAttributes;

export function signIn(username, password) {
    console.log('username==='+username+' password==='+password);
    var authenticationData = {
        Username: username,
        Password: password,
    };
     console.log(authenticationData);
    //var authenticationDetails = new AuthenticationDetails(authenticationData);    

    /*const userData = {
        Username : username,
        Pool : userPool
    };
    */
    //cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        return resolve({message: 'Success', token: "adasdasdasdasda", result: "adasdasdsad"});
        /*
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                // console.log(result);
                const accessToken = result.getAccessToken().getJwtToken();
                // saveToken(accessToken);    

                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                AWS.config.region = 'ap-southeast-2';
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: process.env.REACT_APP_AUTH_IDENTITY_POOL_ID,
                    Logins: {
                        [`cognito-idp.ap-southeast-2.amazonaws.com/${process.env.REACT_APP_AUTH_USER_POOL_ID}`] : result.getIdToken().getJwtToken()
                    }
                });
                AWS.config.credentials.clearCachedId(); //[Kate -- 16/10/2019]: ???
                
                cognitoUser.getUserAttributes(function(err, userAttributes) {
                    if(err) {
                        alert(err.message || JSON.stringify(err));
                        return;
                    }
                    AWS.config.credentials.refresh(error=>{
                        if(error) {
                            // cb(error, null, null);
                            return reject(error);
                        }else {
                            console.log('Successfully logged!');
                            // cb(null, result, userAttributes);
                            return resolve({message: 'Success', token: accessToken, result: userAttributes});
                        }
                    });
                });
                
            },
     
            onFailure: function(err) {
                console.log(err);
                // cb(error || JSON.stringify(error), null);
                return reject(err);
            },
            
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.    

                console.log(userAttributes);
                console.log(requiredAttributes);
                // cb({message: 'First time login'}, null, null);    

                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                delete userAttributes.phone_number_verified;
     
                // store userAttributes on global variable
                sessionUserAttributes = userAttributes;
                return resolve({message: 'First'})
            }
        });
        */
    })
}

export function handleNewPassword(preferredname, newPassword) {
    // console.log(sessionUserAttributes);
    sessionUserAttributes.preferred_username = preferredname;
    return new Promise((resolve, reject) => {
        cognitoUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes, {
            onSuccess: function(result) {
                // console.log(result);
                const accessToken = result.getAccessToken().getJwtToken();
                // saveToken(accessToken);    

                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                AWS.config.region = 'ap-southeast-2';
     
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: process.env.REACT_APP_AUTH_IDENTITY_POOL_ID,
                    Logins: {
                        [`cognito-idp.ap-southeast-2.amazonaws.com/${process.env.REACT_APP_AUTH_USER_POOL_ID}`] : result.getIdToken().getJwtToken()
                    }
                });
                AWS.config.credentials.clearCachedId(); //[Kate -- 16/10/2019]: ???
                
                cognitoUser.getUserAttributes(function(err, userAttributes) {
                    if(err) {
                        alert(err.message || JSON.stringify(err));
                        return;
                    }    

                    //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                    AWS.config.credentials.refresh(error=>{
                        if(error) {
                            // cb(error, null, null);
                            return reject(error);
                        }else {
                            console.log('Successfully logged!');
                            // cb(null, result, userAttributes);
                            return resolve({message: 'Success', token: accessToken, result: userAttributes})
                        }
                    });
                });
            },    

            onFailure: function(err) {
                console.log(err);
                // cb(error || JSON.stringify(error), null);
                return reject(err);
            },
        });
    });
}

export function signOut() {
    const cognitoUser = userPool.getCurrentUser();
    // console.log(cognitoUser);
    if(cognitoUser != null) {
        cognitoUser.signOut();
        return new Promise((resolve, reject)=>{
            resolve({success: true});
        })
    }else {
        return new Promise((resolve, reject)=>{
            reject({success: false});
        })
    }
}

export function forgotPassword(username) {
    const userData = {
        Username: username,
        Pool: userPool
    };
    cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.forgotPassword({
            onSuccess: function(result) {
                console.log(result);
                resolve({message: 'Success', data: result});
            },
            onFailure: function(err) {
                reject(err);
            },
        });
    });
}

export function resetPassword(code, password) {
    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(code, password, {
            onSuccess() {
                resolve({message: "Success"});
            },
            onFailure(err) {
                reject(err);
            }
        });
    });
}

