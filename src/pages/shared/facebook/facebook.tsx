import React, { useEffect, useState } from "react"
// @ts-ignore
import useFacebook from "use-facebook"
import { facebookPageImportMachine } from "../../../machines/FacebookPageImportMachine"
import { useMachine } from "@xstate/react"

const options = {
  appId: process.env.FACEBOOK_APP_ID,
  version: "v14.0",
  lang: "fr_FR",
}

export default function Facebook() {
  const { isFacebookSDKReady } = useFacebook(options)
  const [current, send] = useMachine(facebookPageImportMachine)
  // check if sdk is loaded and ready
  useEffect(() => {
    console.log("ready? ", isFacebookSDKReady)
    if (isFacebookSDKReady) {
      send("READY")
    }
  }, [isFacebookSDKReady])

  // useEffect(() => {
  //   console.log(current)
  // }, current)

  const login = () => {
    send("OPEN_LOGIN")
  }

  // logout
  const logout = () => {
    send("LOGOUT")
  }
  return (
    <div>
      <button onClick={login}>FB Login</button>
      <br />
      <button onClick={logout}>FB logout</button>
    </div>
  )
}
