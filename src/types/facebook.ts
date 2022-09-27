export type FacebookAuthResponse = {
  accessToken: string
  data_access_expiration_time: number
  expiresIn: number
  userID: string
  graphDomain: "facebook"
  signedRequest: string
}

export type FacebookMachineContext = {
  graph_api_version: "v15.0"
  facebook_app_id: string
  auth: FacebookAuthResponse
  me: FacebookMe
  long_lived_user_token: FacebookUserLongLivedToken
  pages_response: FacebookPageTokenRespone
}

export type FacebookStatusResponse = {
  authResponse: FacebookAuthResponse
  status: string
}

export type FacebookMe = {
  name: string
  about: string
  email: string
  birthday: string
  age_range: string
  id: string
  // error:
}

export type FacebookUserLongLivedToken = {
  token_type: string
  access_token: string
  expires_in: number // in seconds
}

export type FacebookPage = {
  name: string
  access_token: string
}

export type FacebookPageList = FacebookPage[]

export type FacebookPageTokenRespone = {
  data: {
    access_token: string
    category: string
    category_list: [
      {
        id: string
        name: string
      }
    ]
    name: string
    id: string
    tasks: string[]
  }[]

  paging: {
    cursors: {
      before: string
      after: string
    }
  }
}

export type RedeemToken = {
  access_token: string
  expires_in: number
  machine_id: string
}

export type FacebookPagePost = {
  id: string
}

export const facebookUrl = (
  page_id: string,
  message: string,
  url: string,
  access_token: string,
  type: string
) => {
  return `https://graph.facebook.com/${page_id}/${type}?message=${message}&url=${url}&access_token=${access_token}`
}
