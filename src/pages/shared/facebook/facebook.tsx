import React, { useEffect } from "react"
const fb = window.FB as any

export default function Facebook() {
  const getLoginStatus = () =>
    fb.getLoginStatus(function (response: any) {
      console.log(response)
    })
  useEffect(() => {
    getLoginStatus()
  }, [])
  const login = () => {
    fb.login(function (response: any) {
      console.log(response)
      if (response.authResponse) {
        console.log("Welcome!  Fetching your information.... ")
        FB.api("/me", function (me: any) {
          console.log("Good to see you, " + me.name + ".")
        })
      } else {
        console.log("User cancelled login or did not fully authorize.")
      }
    })
  }

  const logout = () => {
    fb.logout((response: any) => {
      console.log("logout ", response)
    })
  }
  return (
    <div>
      <button onClick={login}>FB Login</button>
      <br />
      <button onClick={login}>FB logout</button>
    </div>
  )
}
