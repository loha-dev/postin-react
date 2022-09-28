import {
  FacebookContext,
  FacebookMe,
  FacebookPageTokenRespone,
} from "../../types/facebook"
import { supabase } from "../../utils/supabase"

export const getMe = async (token: string) => {
  const getMeResponse = await fetch(
    `https://graph.facebook.com/me?access_token=${token}`
  )
  const me: FacebookMe = await getMeResponse.json()
  return me
}

export const getPages = async (
  user_facebook_id: string,
  long_lived_user_token: string
) => {
  const data = await fetch(
    `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/${user_facebook_id}/accounts?access_token=${long_lived_user_token}`
  )
  const pages: FacebookPageTokenRespone = await data.json()
  return pages
}

export class FacebookService {
  static async saveUpdatePages(info: FacebookContext) {
    const { data } = await supabase
      .from("account")
      .select(`id`)
      .eq("user_id", info.me.id)

    if (data === null || data.length === 0) {
      const { data: newUser } = await supabase.from("account").insert([
        {
          user_id: info.me.id,
          name: info.me.name,
          access_token: info.auth.access_token,
          expires_in: info.auth.expires_in,
          app: "facebook",
        },
      ])
      console.log("new user", newUser)
      const pages = info.pages.data

      const { data: update } = await supabase.from("page").insert(
        pages.map((page) => {
          return {
            page_id: page.id,
            access_token: page.access_token,
            title: page.name,
            social: 1,
            category: page.category,
            account: newUser !== null ? newUser[0].id : 1,
          }
        })
      )

      console.log("update response ", update)
    } else if (data.length === 1) {
      const { data: updateUser } = await supabase
        .from("account")
        .update({
          access_token: info.auth.access_token,
          expires_in: info.auth.access_token,
        })
        .eq("user_id", info.me.id)
      console.log("update user", updateUser)
      const pages = info.pages.data

      pages.forEach(async (page) => {
        const { data: update } = await supabase
          .from("page")
          .update({
            access_token: page.access_token,
          })
          .eq("page_id", page.id)
        console.log(update)
      })
    }
  }
}
