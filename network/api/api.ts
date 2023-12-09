import { request } from './request';
import { IMe, IPagination, IParamsProductId, IParamsProducts, IPriceMax, IProduct, IProductType, IPromotion, IPromotions, ISignIn, ISignInGoogle, ISignInRes, ISignUp } from './response';

export const getMe = () =>
  request<IMe>({
    method: 'get',
    url: '/auth/me',
  });
export const postSignIn = ({ email, password }: ISignIn) =>
  request<ISignInRes>({
    method: 'post',
    url: '/auth/login',
    params: { email, password },
  });
export const postSignInGoogle = ({ accessToken }: ISignInGoogle) =>
  request<ISignInRes>({
    method: 'post',
    url: '/auth/login/google',
    params: { accessToken },
  });
export const postSignUp = ({ email, password, phone, gender }: ISignUp) =>
  request({
    method: 'post',
    url: '/auth/register',
    params: { email, password, phone, gender },
  });

export const getProductType = () =>
  request<IProductType[]>({
    method: 'get',
    url: '/productType',
  });

export const getPromotion = () =>
  request<IPromotions>({
    method: 'get',
    url: '/promotion',
  });


export const getProducts = (params: IParamsProducts, aadToken?: string) =>
  request<IProduct[]>({
    method: 'get',
    url: '/product/all',
    params,
    aadToken
  });


export const getProductsTopSell = ({ limit, page }: IParamsProducts) =>
  request<IProduct[]>({
    method: 'get',
    url: '/product/topSell',
    params: { limit, page },
  });


export const getPriceMax = () =>
  request<IPriceMax>({
    method: 'get',
    url: '/product/priceMax',
  });


export const getProductId = ({ id, ...params }: IParamsProductId, aadToken?: string) =>
  request<IProduct>({
    method: 'get',
    url: `/product/${id}`,
    params,
    aadToken
  });

