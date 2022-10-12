import { Button } from "@mantine/core";
import { useSearch } from "@tanstack/react-location";
import { MakeGenerics } from "@tanstack/react-location";
import { useEffect, useState } from "react";
import {
  addFacebookAccount,
  FacebookService,
  getMe,
  getPages,
  login,
} from "../../../functions/FacebookService";
import {
  FacebookContext,
  FacebookLoginResponse,
  FacebookMe,
  FacebookPageTokenRespone,
} from "../../../types/facebook";

type Search = {
  code: string;
};

export default function Facebook() {
  const params = useSearch<MakeGenerics<{ Search: Search }>>();

  let [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(true);
    (async () => {
      if (!params.code) return console.log("no code");
      if (loggedIn) return console.log("already used code");
      setLoggedIn(true);
      addFacebookAccount(params.code);
    })();
  }, [params.code]);

  return (
    <div>
      <Button className="m-1" variant="outline" onClick={facebookOauth}>
        FB Login
      </Button>
    </div>
  );
}

const facebookOauth = () => {
  const state = "{st=appstate,ds=iugiug68768}";
  const redirect_url = "https://localhost:5173/social/facebook";
  const login =
    (window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${redirect_url}&state=${state}`);
};
