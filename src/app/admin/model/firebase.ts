
export interface User {
  email:string
  password:string
  returnSecureToken?:boolean
}

export interface IFbAuthResponse {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}
