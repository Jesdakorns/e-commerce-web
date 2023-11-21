import { request } from './request';
import { IMe, IProductType, ISignIn, ISignInGoogle, ISignInRes, ISignUp } from './response';

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
export const postSignInGoogle = ({ email, name, image }: ISignInGoogle) =>
  request<ISignInRes>({
    method: 'post',
    url: '/auth/login/google',
    params: { email, name, image },
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

