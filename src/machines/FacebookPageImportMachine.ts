import { type } from "os"
import { actions, assign, createMachine } from "xstate"
import { send } from "xstate/lib/actions"
import {
  FacebookAuthResponse,
  FacebookMe,
  FacebookStatusResponse,
  FacebookUserLongLivedToken,
} from "../types/facebook"

export const facebookPageImportMachine = createMachine(
  {
    id: "facebook_import_pages",
    initial: "idle",
    context: {
      graph_api_version: "v14.0",
      facebook_app_id: process.env.FACEBOOK_APP_ID,
      facebook_app_secret: process.env.FACEBOOK_APP_SECRET,
      auth: {
        accessToken: "",
        data_access_expiration_time: 0,
        expiresIn: 0,
        userID: "",
        graphDomain: "facebook",
        signedRequest: "",
      } as FacebookAuthResponse,
      me: {
        name: "",
        id: "",
      } as FacebookMe,
      long_lived_user_token: {
        token_type: "",
        access_token: "",
        expires_in: 0, // in seconds},
      } as FacebookUserLongLivedToken,
    },
    states: {
      idle: {
        on: {
          GOT_RESPONSE: {
            // target: "select_pages",
            actions: [
              (context, event) => {
                console.log("on got response")
                console.log(event)
              },
              "saveAuthResponse",
            ],
          },

          OPEN_LOGIN: {
            target: "logging_in",
          },
        },
      },
      logging_in: {
        invoke: {
          id: "logging_in",
          src: (context, event) => () => {
            return new Promise((resolve, reject) => {
              FB.login(function (response) {
                if (response.status !== "connected") reject(response)
                resolve(response)
              })
            })
          },
          onDone: {
            target: "get_me",
            actions: [
              (context, event) => {
                console.log("done getting token", event)
              },
              assign({
                auth: (
                  context,
                  event: { data: { authResponse: FacebookAuthResponse } }
                ) => event.data.authResponse,
              }),
            ],
          },
          onError: {
            target: "idle",
            actions: () => {
              console.log("error getting logging in")
            },
          },
        },
      },
      loading: {
        invoke: {
          id: "getUserToken",
          src: (context, event) => () => {
            return new Promise((resolve, reject) => {
              FB.getLoginStatus(function (response) {
                console.log(response)
                if (response.status !== "connected") reject(response)
                resolve(response)
              })
            })
          },
          onDone: {
            target: "get_me",
            actions: [
              (context, event) => {
                console.log("done getting token", event)
              },
              assign({
                auth: (
                  context,
                  event: { data: { authResponse: FacebookAuthResponse } }
                ) => event.data.authResponse,
              }),
            ],
          },
          onError: {
            target: "idle",
            actions: () => {
              console.log("error getting token")
            },
          },
        },
      },
      get_me: {
        invoke: {
          id: "get_me",
          src: (context, event) => () => {
            return new Promise((resolve, reject) => {
              FB.api("/me", function (response: FacebookMe) {
                if (!response) reject("no name in response")
                resolve(response)
              })
            })
          },
          onDone: {
            target: "get_long_lived_token",
            actions: [
              (context, event) => {
                console.log("done getting me", event)
              },
              assign({
                me: (context, event: { data: { data: FacebookMe } }) =>
                  event.data,
              }),
            ],
          },
          onError: {
            target: "idle",
            actions: () => {
              console.log("error getting me")
            },
          },
        },
      },
      get_long_lived_token: {
        invoke: {
          id: "get_long_lived_token",
          src: (context, event) => async () => {
            const data = await fetch(
              `https://graph.facebook.com/${context.graph_api_version}/oauth/access_token?grant_type=fb_exchange_token&client_id=${context.facebook_app_id}&client_secret=${context.facebook_app_secret}&fb_exchange_token=${context.auth.accessToken}`
            )
            const response = await data.json()
            return new Promise((resolve, reject) => {
              if (!response) reject("no long lived for you")
              resolve(response)
            })
          },
          onDone: {
            target: "get_pages",
            actions: [
              (context, event) => {
                console.log("done long lived token", event)
              },
              assign({
                long_lived_user_token: (
                  context,
                  event: { data: { data: FacebookMe } }
                ) => event.data,
              }),
            ],
          },
          onError: {
            target: "idle",
            actions: () => {
              console.log("error long lived token")
            },
          },
        },
      },
      get_pages: {
        entry: (context, vent) => {
          console.log("entered get pages state", context)
        },
        invoke: {
          id: "get_pages",
          src: (context, event) => async () => {
            const data = await fetch(
              `https://graph.facebook.com/${context.graph_api_version}/${context.me.id}/accounts?access_token=${context.long_lived_user_token.access_token}`
            )
            const response = await data.json()
            console.log(response)

            return new Promise((resolve, reject) => {
              // if (!response) reject("no long lived for you")
              // resolve(response)
            })
          },
          onDone: {
            target: "select_pages",
            actions: [
              (context, event) => {
                console.log("done getting pages", event)
              },
              assign({
                long_lived_user_token: (
                  context,
                  event: { data: { data: FacebookMe } }
                ) => event.data,
              }),
            ],
          },
          onError: {
            target: "idle",
            actions: () => {
              console.log("error long lived token")
            },
          },
        },
      },
      select_pages: {
        entry: (context, vent) => {
          console.log("entered select pages state", context)
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
        target: "loading",
        actions: [
          (context, event) => {
            console.log(context, event)
          },
        ],
      },
      LOGGED_IN: {
        target: "select_pages",
        actions: [],
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
      showPageList: () => {},
      // getPagesTokens
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
