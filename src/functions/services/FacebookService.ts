import type { FacebookMachineContext } from "./../../types/facebook";
import { supabase } from "../../utils/supabase";

export class FacebookService {
  static async saveUpdatePages(info: FacebookMachineContext) {
    const { data } = await supabase
      .from("account")
      .select(`id`)
      .eq("user_id", info.me.id);

    if (data === null || data.length === 0) {
      const { data: newUser } = await supabase.from("account").insert([
        {
          user_id: info.me.id,
          name: info.me.name,
          access_token: info.long_lived_user_token.access_token,
          expires_in: info.long_lived_user_token.expires_in,
          app: "facebook",
        },
      ]);
      console.log("new user", newUser);
      const pages = info.pages_response.data;

      const { data: update } = await supabase.from("page").insert(
        pages.map((page) => {
          return {
            page_id: page.id,
            access_token: page.access_token,
          };
        })
      );

      console.log("update response ", update);
    } else if (data.length === 1) {
      const { data: updateUser } = await supabase
        .from("account")
        .update({
          access_token: info.long_lived_user_token.access_token,
          expires_in: info.long_lived_user_token.access_token,
        })
        .eq("user_id", info.me.id);
      console.log("update user", updateUser);
    }
    /*
    const pages = info.pages_response.data;

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
    */
  }
}
