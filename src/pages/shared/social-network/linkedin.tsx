import React, { useState } from "react";

import { useLinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own

export default function Linkedin() {
  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.LINKEDIN_CLIENT_ID || "",
    redirectUri: `${window.location.origin}/social/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div>
      <img
        onClick={linkedInLogin}
        src="/images/connect-linkedin.png"
        alt="Sign in with Linked In"
        style={{ maxWidth: "180px", cursor: "pointer" }}
      />
    </div>
  );
}
