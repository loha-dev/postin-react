import React, { useEffect, useState } from "react"
// @ts-ignore
import useFacebook from "use-facebook"

const options = {
  appId: process.env.FACEBOOK_APP_ID,
  version: "v14.0",
  lang: "fr_FR",
}

export default function Facebook() {
  const { isFacebookSDKReady } = useFacebook(options)
  useEffect(() => {
    console.log("ready? ", isFacebookSDKReady)
    if (isFacebookSDKReady) {
      getLoginStatus()
    }
  }, [isFacebookSDKReady])
  const getLoginStatus = () =>
    FB.getLoginStatus(function (response: any) {
      console.log(response)
    })

  const facebookGetUserInfo = () => {}

  const logout = () => {
    FB.logout((response: any) => {
      console.log("logout ", response)
    })
  }
  return (
    <div>
      <button onClick={facebookGetUserInfo}>FB Login</button>
      <br />
      <button onClick={logout}>FB logout</button>
    </div>
  )
}
