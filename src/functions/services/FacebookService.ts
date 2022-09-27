import type {
  FacebookMe,
  FacebookPageTokenRespone,
  FacebookUserLongLivedToken,
} from "./../../types/facebook";

import { supabase } from "../../utils/supabase";

export class FacebookService {
  static async saveUser(info: FacebookMe & FacebookUserLongLivedToken) {
    const { data } = await supabase
      .from("account")
      .select(`id`)
      .eq("user_id", info.id);
    if (data === null || data.length === 0) {
      const { data: newUser } = await supabase.from("account").insert([
        {
          user_id: info.id,
          name: info.name,
          access_token: info.access_token,
          expires_in: info.expires_in,
          app: "facebook",
        },
      ]);
      console.log("new user", newUser);
    } else if (data.length === 1) {
      const { data: updateUser } = await supabase
        .from("account")
        .update({
          access_token: info.access_token,
          expires_in: info.expires_in,
        })
        .eq("user_id", info.id);
      console.log("update user", updateUser);
    }
  }
  static async saveUpdatePages(page_info: FacebookPageTokenRespone) {
    const pages = page_info.data;
    for (let page of pages) {
      const { access_token, id, category } = page;
      const { data: update } = await supabase
        .from("page")
        .update({
          access_token: access_token,
          category: category,
        })
        .eq("page_id", id);
      console.log("update response ", update);
    }
  }
}
