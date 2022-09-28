import { Button } from "@mantine/core"

export default function Facebook() {
  const facebookOauth = () => {
    const state = "{st=appstate,ds=iugiug68768}"
    const login = window.open(
      `https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.SERVER}/facebook&state=${state}`,
      "example",
      "width=600,height=400"
    )
    // const login = fetch(
    //   `https://www.facebook.com/v15.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.SERVER}/facebook&state=${state}`
    // )
  }
  return (
    <div>
      <Button className="m-1" variant="outline" onClick={facebookOauth}>
        FB Login
      </Button>
    </div>
  )
}
