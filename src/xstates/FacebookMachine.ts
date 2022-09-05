import { createMachine } from "xstate"

const getFacebookPageAccessMachine = createMachine({
  id: "promise",
  initial: "idle",
  states: {
    idle: {
      on: {
        USER_LOGIN: { target: "got_user_access_token" },
      },
    },
    got_user_access_token: {
      on: {
        USER_SHOW_PAGE_LIST: {},
        GET_LONG_LIVED_USER_ACCESS_TOKEN: { target: "got_long_lived_user" },
      },
    },
    got_long_lived_user: {
      // needs app secret
      on: {
        GET_LONG_LIVED_PAGE_ACCESS_TOKEN: {
          target: "got_long_lived_page_access_token",
        },
      },
    },
    got_long_lived_page_access_token: {},
  },
})
