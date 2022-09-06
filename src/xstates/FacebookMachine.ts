import { actions, createMachine } from "xstate"

const getFacebookPageAccessMachine = createMachine(
  {
    id: "facebook_import_pages",
    initial: "idle",
    states: {
      idle: {
        on: {
          USER_LOGIN: {
            target: "logged_in",
          },
        },
        states: {
          idle: {},
          popup: {},
          timeout: {},
        },
      },
      logged_in: {
        on: {
          GET_USER_TOKEN: {
            target: "user_token",
          },
        },
      },
      user_token: {
        states: {
          idle: {
            on: {
              SHOW_PAGES: { target: "showing_pages" },
            },
          },
          showing_pages: {},
        },
      },
      pages_selected: {},
      pages_tokens: {},
      tokens_saved: {},
      success: {},
    },
  },
  {
    actions: {
      getUserInfo: () => {
        FB.login(function (response: any) {
          console.log(response)
          if (response.authResponse) {
            console.log("Welcome!  Fetching your information.... ")
            FB.api("/me", function (me: any) {
              console.log("me: ", me)

              console.log("Good to see you, " + me.name + ".")
            })
          } else {
            console.log("User cancelled login or did not fully authorize.")
          }
        })
      },
      getUserToken: () => {
        fetch(
          `https://graph.facebook.com/{graph-api-version}/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={your-access-token}`
        )
      },
      showPageList: () => {},
      getPagesTokens: () => {
        const pages: string[] = []
        for (const page in pages) {
          fetch(
            `https://graph.facebook.com/{graph-api-version}/{user-id}/accounts?access_token={long-lived-user-access-token}`
          )
        }
      },
      logout: () => {
        FB.logout((response: any) => {
          console.log("logout ", response)
        })
      },
    },
  }
)
