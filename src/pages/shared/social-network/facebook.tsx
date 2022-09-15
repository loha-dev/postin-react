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
      {current.matches("idle") && <span>Idle</span>}
      {current.matches("loggin_in") && <span>loggin_in</span>}
      {current.matches("loading") && <span>loading</span>}
      {current.matches("get_me") && <span>get_me</span>}
      {current.matches("get_long_lived_token") && (
        <span>get_long_lived_token</span>
      )}
      {current.matches("get_pages") && <span>get_pages</span>}
      {current.matches("pages_selection") && <span>pages_selection</span>}
      {current.matches("saving_pages") && <span>saving_pages</span>}
      {current.matches("finished") && <span>finished</span>}
    </div>
  )
}
