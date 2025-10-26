// src/components/RoleRedirect.js  (debug version)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser as getLocalCurrentUser } from "../utils/localAuth";
import { getSessionTokens, getCognitoUser } from "../auth/cognitoAuth";

function decodeJwtPayload(token) {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = payload.length % 4;
    const padded = pad ? payload + "=".repeat(4 - pad) : payload;
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

export default function RoleRedirect() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkRoleAndRedirect() {
      if (process.env.REACT_APP_AUTH_PROVIDER !== "cognito") {
        const localUser = getLocalCurrentUser();
        if (!mounted) return;
        if (localUser?.role === "teacher") navigate("/teacher");
        else if (localUser?.role === "student") navigate("/student");
        else navigate("/login");
        return;
      }

      try {
        const tokens = await getSessionTokens(); // { idToken, accessToken, refreshToken } or null
        console.log("DEBUG: tokens object:", tokens);

        if (tokens && tokens.idToken) {
          const payload = decodeJwtPayload(tokens.idToken);
          console.log("DEBUG: idToken payload:", payload);
          console.log("DEBUG: cognito:groups claim:", payload?.["cognito:groups"]);
          const roleFromGroups = payload?.["cognito:groups"]?.[0];
          const roleFromAttr = payload?.["custom:role"] || payload?.role;
          const role = roleFromGroups || roleFromAttr;
          console.log("DEBUG: resolved role:", role);

          if (!mounted) return;
          if (role?.toLowerCase().includes("teacher")) navigate("/teacher");
          else if (role?.toLowerCase().includes("student")) navigate("/student");
          else navigate("/login");
          return;
        }

        // fallback: try getCognitoUser()
        const cUser = await getCognitoUser();
        console.log("DEBUG: getCognitoUser()", cUser);
        if (!mounted) return;
        const attrRole = cUser?.attributes?.["custom:role"] || cUser?.attributes?.role;
        if (attrRole?.toLowerCase().includes("teacher")) navigate("/teacher");
        else if (attrRole?.toLowerCase().includes("student")) navigate("/student");
        else navigate("/login");
      } catch (err) {
        console.error("RoleRedirect error:", err);
        navigate("/login");
      } finally {
        if (mounted) setChecking(false);
      }
    }

    checkRoleAndRedirect();
    return () => { mounted = false; };
  }, [navigate]);

  if (checking) return <div style={{ textAlign: "center", marginTop: 80 }}>Checking account role…</div>;
  return null;
}
