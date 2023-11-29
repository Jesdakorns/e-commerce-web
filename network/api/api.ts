import { request } from './request';
import { IMe, IPagination, IParamsProducts, IProductType, IProducts, IPromotion, IPromotions, ISignIn, ISignInGoogle, ISignInRes, ISignUp } from './response';

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


export const getProducts = ({ limit, page }: IParamsProducts) =>
  request<IPagination<IProducts[]>>({
    method: 'get',
    url: '/product',
    params: { limit ,page},
  });

