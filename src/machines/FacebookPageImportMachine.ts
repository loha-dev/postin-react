import { type } from "os"
import { actions, assign, createMachine } from "xstate"
import { send } from "xstate/lib/actions"
import { FacebookAuthResponse, FacebookStatusResponse } from "../types/facebook"

const getUserInfo = () => {
  FB.login(function (response: any) {
    console.log(response)
    if (response.authResponse) {
      // assign((context) => (context.auth = response.authResponse))
      send({ type: "GOT_RESPONSE", response: response.authResponse })
      console.log("Welcome!  Fetching your information.... ")
    } else {
      send({ type: "CANCELED" })

      console.log("User cancelled login or did not fully authorize.")
    }
  })
}

const saveAuthResponse = () =>
  assign({
    auth: (context, event: { type: string; response: FacebookAuthResponse }) =>
      event.response,
  })

const getLoginStatus = () =>
  FB.getLoginStatus(function (response) {
    console.log(response)
    if (response.status !== "connected") return
    console.log("connected")
    send({ type: "GOT_RESPONSE", response: response.authResponse })
  })

export const facebookPageImportMachine = createMachine(
  {
    id: "facebook_import_pages",
    initial: "idle",
    context: {
      auth: {
        accessToken: "",
        data_access_expiration_time: 0,
        expiresIn: 0,
        userID: "",
        graphDomain: "facebook",
        signedRequest: "",
      } as FacebookAuthResponse,
      me: {},
    },
    states: {
      idle: {},
      select_pages: {
        entry: () => {
          console.log("entered select pages state")
        },
        on: {
          FETCH_ME: {
            actions: "fetchMe",
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
      canceled: {},
      logged_out: {},
      success: {},
    },
    on: {
      READY: {
        actions: "getLoginStatus",
      },
      OPEN_LOGIN: {
        actions: "getUserInfo",
      },
      GOT_RESPONSE: {
        target: ".select_pages",
        actions: "saveAuthResponse",
      },
      CANCELED: {
        target: "canceled",
      },
      LOGOUT: {
        target: "logged_out",
        actions: "logout",
      },
    },
  },
  {
    actions: {
      getLoginStatus,
      getUserInfo,
      saveAuthResponse,
      fetchMe: () => {
        FB.api("/me", function (me: any) {
          console.log("me: ", me)

          console.log("Good to see you, " + me.name + ".")
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
        console.log("logout triggered")

        FB.logout((response: any) => {
          console.log("logout ", response)
        })
      },
    },
  }
)
