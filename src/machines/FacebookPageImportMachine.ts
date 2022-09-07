import { actions, createMachine } from "xstate"

export const facebookPageImportMachine = createMachine(
  {
    id: "facebook_import_pages",
    initial: "idle",
    states: {
      idle: {
        on: {
          OPEN_LOGIN: {
            actions: "getUserInfo",
          },
          USER_LOGIN: {
            target: "logged_in",
          },
        },
      },
      logged_in: {
        on: {
          GET_USER_TOKEN: {
            actions: "showPageList",
          },
          SHOW_PAGES: {
            actions: "showPageList",
          },
          PAGE_SELECTED: {
            target: "pages_selected",
          },
        },
      },
      pages_selected: {
        on: {
          "": {
            actions: "importPages",
            target: "importing",
          },
        },
      },
      importing: {
        on: {
          FINISHED_IMPORT: {
            target: "pages_tokens",
          },
        },
      },
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
      // getPagesTokens
      importPages: () => {
        const pages: string[] = []
        for (const page in pages) {
          fetch(
            `https://graph.facebook.com/{graph-api-version}/{user-id}/accounts?access_token={long-lived-user-access-token}`
          )
        }
      },
      getClientCode: (): { code: string } => {
        // machine_id optional
        fetch(
          `https://graph.facebook.com/{graph-api-version}/oauth/?client_id={app-id}&client_secret={app-secret}&redirect_uri={app-redirect-uri}&access_token={long-lived-user-access-token}`
        )
        return { code: "" }
      },
      redeemToken: () => {
        fetch(
          `https://graph.facebook.com/{graph-api-version}/oauth/access_token?code={code-for-your-client}&client_id={app-id}&redirect_uri={app-redirect-uri}&machine_id= {your-client-machine-id}`
        )
      },
      logout: () => {
        FB.logout((response: any) => {
          console.log("logout ", response)
        })
      },
    },
  }
)
