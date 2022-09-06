import { actions, createMachine } from "xstate"

const getFacebookPageAccessMachine = createMachine(
  {
    id: "facebook_import_pages",
    initial: "idle",
    states: {
      idle: {
        on: {
          USER_LOGIN: {
            target: "got_user_access_token",
          },
        },
        states: {
          idle: {},
          clicked: {},
          timeout: {},
        },
      },
      got_user_access_token: {
        on: {
          GET_LONG_LIVED_USER_ACCESS_TOKEN: {
            target: "got_long_lived_user",
          },
        },
      },
      got_long_lived_user: {
        on: {
          GET_LONG_LIVED_PAGE_ACCESS_TOKEN: {
            target: "success",
          },
        },
        states: {
          idle: {
            on: {
              SHOW_PAGE_LIST: { target: "showing_page_list" },
            },
          },
          showing_page_list: {},
        },
      },
      selected_pages_to_import: {},
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
      getLongLivedUserAccessToken: () => {},
      showPageList: () => {},
      importPages: () => {},
      logout: () => {
        FB.logout((response: any) => {
          console.log("logout ", response)
        })
      },
    },
  }
)
