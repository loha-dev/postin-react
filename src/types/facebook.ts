export type FacebookAuthResponse = {
  accessToken: string
  data_access_expiration_time: number
  expiresIn: number
  userID: string
  graphDomain: "facebook"
  signedRequest: string
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
}

export type FacebookPage = {
  name: string
  access_token: string
}

export type FacebookPageList = FacebookPage[]

export type FacebookPageTokenRespone = {
  data: [
    {
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
    }
  ]
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
