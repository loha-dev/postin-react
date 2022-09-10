import React, { useEffect, useState } from "react"
// @ts-ignore
import useFacebook from "use-facebook"
import { useAtom } from "jotai"
import { facebookPageImportMachine } from "../../../machines/FacebookPageImportMachine"
import { useMachine } from "@xstate/react"
import { atomWithMachine } from "jotai/xstate"

const options = {
  appId: process.env.FACEBOOK_APP_ID,
  version: "v14.0",
  lang: "fr_FR",
}

const facebookMachine = atomWithMachine((get) => facebookPageImportMachine)

export default function Facebook() {
  const { isFacebookSDKReady } = useFacebook(options)
  const [current, send] = useAtom(facebookMachine)
  // check if sdk is loaded and ready
  useEffect(() => {
    if (isFacebookSDKReady) {
      send("READY")
    }
  }, [isFacebookSDKReady])

  useEffect(() => {
    console.log("state change: ", current.value)
  }, [current])

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
