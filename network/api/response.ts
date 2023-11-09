import { PROBLEM_CODE } from 'apisauce';

//-------- API ---------//

export interface IError {
  error: string
  httpStatusCode: number
  message: string | string[]
  problem: string
  statusCode: number
}

export interface IResponse<T> {
  errorMessage?: string;
  status?: string;
  httpStatusCode?: number;
  problem?: PROBLEM_CODE;
  data?: T;
}

export interface Status {
  code: string;
  description?: string;
}

export interface ApiBaseResponse<T> {
  data?: T;
}

export interface AuthData {
  accessToken: string;
}

export interface ISignInRes {
  id: string
  name: string
  email: string
  accessToken: string
  // refreshToken: string
}

export interface ISignIn {
  email: string
  password: string
}

export interface ISignUp {
  email: string
  password: string
  phone: string
  gender: string
}

