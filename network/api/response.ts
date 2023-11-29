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

export interface IMe {
}

export interface ISignInRes {
  id: string
  name: string
  email: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface ISignIn {
  email: string
  password: string
}

export interface ISignInGoogle {
  accessToken: string
}

export interface ISignUp {
  email: string
  password: string
  phone: string
  gender: string
}


export interface IProductType {
  id: number;
  titleEn: string;
  titleTh: string;
  image: string;
  remove: boolean;
  createdAt: Date;
  updatedAt: Date;
}




export interface IPromotion {
  id: number;
  url: string;
  image: string;
  remove: boolean;
  isSelect: boolean;
  created_at: Date;
  updated_at: Date;
}


export interface IPromotions {
  promotion?: IPromotion[] | []
  promotionSub?: IPromotion[] | []
}


export interface IProducts {
  id: number;
  title: number;
  description: string;
  price: number;
  coverPhoto: string[];
  stockQuantity: number;
  salesAmount: number;
  remove: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IParamsProducts {
  limit: number
  page: number
}


export interface IPagination<T> {
  data: T
  total: number,
  nextPage: number | null,
  prevPage: number | null
}

