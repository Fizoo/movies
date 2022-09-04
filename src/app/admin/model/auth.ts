export interface ResponseToken {
  success: boolean;
  expires_at: string;
  request_token: string;

}


export interface Login {
	username: string;
	password: string;
	request_token: string;
}

export interface User {
  username: string;
  password: string;
}

export interface IError {
	status_code: number;
	status_message: string;
	success: boolean;
}

export interface ErrorResponse{
  error: IError;
  headers:any;
  message:string;
  name:string;
  ok:boolean;
  status:number;
  statusText:string;
  url:string
}

