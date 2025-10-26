// src/auth/cognitoAuth.js
import { Amplify } from "aws-amplify";
import {
  signInWithRedirect,
  signOut as amplifySignOut,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";

export function configureCognitoFromEnv() {
  const domain = process.env.REACT_APP_COGNITO_DOMAIN;
  const region = process.env.REACT_APP_COGNITO_REGION;
  const userPoolId = process.env.REACT_APP_COGNITO_USER_POOL_ID;
  const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
  const redirect = process.env.REACT_APP_COGNITO_REDIRECT;
  const responseType = process.env.REACT_APP_COGNITO_RESPONSE_TYPE || "code";

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId: clientId,
        region,
        loginWith: {
          oauth: {
            domain,
            scopes: ["openid", "email", "profile"],
            redirectSignIn: [redirect],
            redirectSignOut: [redirect],
            responseType,
          },
        },
      },
    },
  });
}

export async function hostedSignIn() {
  return signInWithRedirect();
}

export async function hostedSignOut() {
  return amplifySignOut();
}

export async function getSessionTokens() {
  try {
    const session = await fetchAuthSession();
    return session?.tokens || null;
  } catch {
    return null;
  }
}

export async function getCognitoUser() {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}
