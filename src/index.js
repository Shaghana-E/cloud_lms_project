import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// ✅ Configure AWS Cognito only if the .env toggle is set to "cognito"
if (process.env.REACT_APP_AUTH_PROVIDER === "cognito") {
  import("./auth/cognitoAuth")
    .then(({ configureCognitoFromEnv }) => configureCognitoFromEnv())
    .catch(err => console.error("Could not configure Cognito:", err));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
