import React, { useEffect } from "react"
const fb = window.FB as any

export default function Facebook() {
  useEffect(() => {
    fb.getLoginStatus(function (response: any) {
      console.log(response)
    })
  }, [])
  const login = fb.login()
  return (
    <div>
      <button onClick={login}>FB Login</button>
    </div>
  )
}
