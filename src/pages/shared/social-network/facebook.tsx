import { Button } from "@mantine/core"
import { useSearch } from "@tanstack/react-location"
import { MakeGenerics } from "@tanstack/react-location"
import { useEffect, useState } from "react"
import {
  FacebookLoginResponse,
  FacebookMe,
  FacebookPageTokenRespone,
} from "../../../types/facebook"

type Search = {
  code: string
}

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

export default function Facebook() {
  const search = useSearch<MakeGenerics<{ Search: Search }>>()
  let [loggedIn, setLoggedIn] = useState(false)

  let [auth, setAuth] = useState<FacebookLoginResponse>({
    access_token: "",
    expires_in: 0,
    token_type: "",
  })

  let [me, setMe] = useState<FacebookMe>({
    name: "",
    id: "",
  })

  let [pages, setPages] = useState<FacebookPageTokenRespone>({
    data: [
      {
        access_token: "",
        category: "",
        category_list: [
          {
            id: "",
            name: "",
          },
        ],
        name: "",
        id: "",
        tasks: [""],
      },
    ],
    paging: {
      cursors: {
        before: "",
        after: "",
      },
    },
  })

  useEffect(() => {
    // Login if code present,
    // 1- Facebook Dialog Oauth
    // 2- Server receives code and get access token + long lived access token
    if (!search.code) return
    if (loggedIn) return console.log("already used code")
    setLoggedIn(true)
    ;(async () => {
      const response = await fetch(
        `${process.env.SERVER}/facebook/login?code=${search.code}`
      )
      const auth: FacebookLoginResponse = await response.json()
      if (auth.error) return console.log("Hummm, 🤔", auth.error) // add error notification

      // on success Save / Update
      setAuth(auth)
    })()
  }, [search.code])

  // when auth aquired
  useEffect(() => {
    if (!auth.expires_in) return
    ;(async () => {
      const meResponse = await getMe(auth.access_token)
      setMe(meResponse)
    })()
  }, [auth])

  // when me aquired
  useEffect(() => {
    if (!me.id.length) return
    ;(async () => {
      const pagesResponse = await getPages(me.id, auth.access_token)
      setPages(pagesResponse)
      console.log(pagesResponse)
    })()
  }, [me])

  // when pages aquired
  useEffect(() => {
    if (!pages.data.length) return console.log("no page", pages.data)
    // save all the data
  }, [pages])

  return (
    <div>
      <Button className="m-1" variant="outline" onClick={facebookOauth}>
        FB Login
      </Button>
    </div>
  )
}

const facebookOauth = () => {
  const state = "{st=appstate,ds=iugiug68768}"
  const redirect_url = "https://localhost:5173/social/facebook"
  const login =
    (window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${redirect_url}&state=${state}`)
}
