import { request } from './request';
import { ISignIn, ISignInRes, ISignUp } from './response';

export const postSignIn = ({ email, password }: ISignIn) =>
  request<ISignInRes>({
    method: 'post',
    url: '/auth/login',
    params: { email, password },
  });
export const postSignUp = ({ email, password, phone, gender }: ISignUp) =>
  request({
    method: 'post',
    url: '/auth/register',
    params: { email, password, phone, gender },
  });

