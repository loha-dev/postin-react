export type FacebookAuthResponse = {
  accessToken: string
  data_access_expiration_time: number
  expiresIn: number
  userID: string
  graphDomain: "facebook"
  signedRequest: string
}

export type FacebookMe = {
  name: string
  about: string
  email: string
  birthday: string
  age_range: string
  id: string
}

export type FacebookPage = {
  name: string
  access_token: string
}

export type FacebookPageList = FacebookPage[]

export type FacebookLongLivedAccess = {
  access_token: string
  token_type: string
  expires_in: number
}

export type FacebookPagePost = {
  id: string
}
