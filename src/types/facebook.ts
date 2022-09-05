export type FacebookAuthResponse = {
  accessToken: string
  data_access_expiration_time: number
  expiresIn: number
  userID: string
  graphDomain: "facebook"
  signedRequest: string
}
