import {
  ClientToken,
  CodeResponse,
  FacebookContext,
  FacebookLoginResponse,
  FacebookMe,
  FacebookPageTokenRespone,
} from "../types/facebook";
import { supabase } from "../utils/supabase";

export const getMe = async (token: string) => {
  const getMeResponse = await fetch(
    `https://graph.facebook.com/me?access_token=${token}`
  );
  const me: FacebookMe = await getMeResponse.json();
  console.log("me ", me);
  return me;
};

export const getClientToken = async (clientCode: string) => {
  // without machine id
  const clientTokenFetch = await fetch(
    `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/oauth/access_token?code=${clientCode}&client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}` // &machine_id={your-client-machine-id}
  );
  const clientTokenResponse: ClientToken = await clientTokenFetch.json();

  return clientTokenResponse;
};

// first login / update long lived token
export const login = async (code: string) => {
  const response = await fetch(
    `${process.env.SERVER}/facebook/login?code=${code}`
  );
  const responseData: FacebookLoginResponse = await response.json();

  return responseData;
};

// for every device
export const getClientCode = async (token: string) => {
  const response = await fetch(
    `${process.env.SERVER}/facebook/code?token=${token}`
  );
  const codeResponseData: CodeResponse = await response.json();
  console.log("client code", codeResponseData);

  return codeResponseData;
};

export const addFacebookAccount = async (code: string) => {
  //long lived token
  const auth = await login(code);
  if (auth.error) return console.log("error", auth);

  const me = await getMe(auth.access_token);

  // for each device
  const clientCode = await getClientCode(auth.access_token);
  const clientToken = await getClientToken(clientCode.code);
  const pages = await getPages(me.id, clientToken.access_token);

  // console.log(pages)
};

// triggered at page selection
export const getDeviceClientToken = async (longLivedAccessToken: string) => {
  // for each device

  const me = await getMe(longLivedAccessToken);
  const clientCode = await getClientCode(longLivedAccessToken);
  const clientToken = await getClientToken(clientCode.code);
  const pages = await getPages(me.id, clientToken.access_token);

  console.log(pages);
};

// need to be called after generating client-code is received
export const getPages = async (userId: string, clientToken: string) => {
  const data = await fetch(
    `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/${userId}/accounts?access_token=${clientToken}`
  );
  const pages: FacebookPageTokenRespone = await data.json();
  // console.log("pages ", pages)
  return pages;
};

export class FacebookService {
  static async saveUpdatePages(info: FacebookContext) {
    const { data } = await supabase
      .from("account")
      .select(`id`)
      .eq("user_id", info.me.id);

    if (data === null || data.length === 0) {
      const { data: newUser } = await supabase.from("account").insert([
        {
          user_id: info.me.id,
          name: info.me.name,
          access_token: info.auth.access_token,
          expires_in: info.auth.expires_in,
          app: "facebook",
        },
      ]);
      console.log("new user", newUser);
      const pages = info.pages.data;

      const { data: update } = await supabase.from("page").insert(
        pages.map((page) => {
          return {
            page_id: page.id,
            access_token: page.access_token,
            title: page.name,
            social: 1,
            category: page.category,
            account: newUser !== null ? newUser[0].id : 1,
          };
        })
      );

      console.log("update response ", update);
    } else if (data.length === 1) {
      const { data: updateUser } = await supabase
        .from("account")
        .update({
          access_token: info.auth.access_token,
          expires_in: info.auth.access_token,
        })
        .eq("user_id", info.me.id);
      console.log("update user", updateUser);
      const pages = info.pages.data;

      pages.forEach(async (page) => {
        const { data: update } = await supabase
          .from("page")
          .update({
            access_token: page.access_token,
          })
          .eq("page_id", page.id);
        console.log(update);
      });
    }
  }
}
