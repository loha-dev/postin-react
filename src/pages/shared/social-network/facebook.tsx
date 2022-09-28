import { Button } from "@mantine/core"
import { useSearch } from "@tanstack/react-location"
import { MakeGenerics } from "@tanstack/react-location"
import { useEffect, useState } from "react"
import {
  FacebookService,
  getMe,
  getPages,
} from "../../../functions/services/FacebookService"
import {
  FacebookContext,
  FacebookLoginResponse,
  FacebookMe,
  FacebookPageTokenRespone,
} from "../../../types/facebook"

type Search = {
  code: string
}

export default function Facebook() {
  const params = useSearch<MakeGenerics<{ Search: Search }>>()

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
    if (!params.code) return
    if (loggedIn) return console.log("already used code")
    setLoggedIn(true)
    ;(async () => {
      const response = await fetch(
        `${process.env.SERVER}/facebook/login?code=${params.code}`
      )
      const auth: FacebookLoginResponse = await response.json()
      if (auth.error) {
        // clearParams()
        return console.log("Hummm, 🤔", auth.error)
      } // add error notification

      // on success Save / Update
      setAuth(auth)
    })()
  }, [params.code])

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
    // save page data
    FacebookService.saveUpdatePages({
      auth: auth,
      me: me,
      pages: pages,
    } as FacebookContext)
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
