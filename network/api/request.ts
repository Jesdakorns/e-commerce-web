import { ApiResponse, create } from 'apisauce';

import { ApiBaseResponse, IResponse } from './response';
import { getAccessToken } from '@/utils/auth';


interface IRequest {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  params?: object;
  axiosConfig?: object;
  aadToken?: string;
}
const DEFAULT_API_CONFIG = {
  url: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 180000,
};

const Api = create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: 'application/json',
    credentials: true,
    'Access-Control-Allow-Origin' : '*',
  },
});

export const request = async <T>({
  method,
  url,
  params,
  axiosConfig,
}: IRequest): Promise<IResponse<T>> => {
  // wait back end for reference token
  const token = await getAccessToken();
  if (token) {
    Api.setHeader('Authorization', `Bearer ${token}`);
  }

  // eslint-disable-next-line no-console
  console.log(
    {
      url,
      method,
      params,
      axiosConfig,
    },
    'Request'
  );

  const response: ApiResponse<ApiBaseResponse<T>> = await Api[method](url, params, axiosConfig);
  if (response.ok) {
    const responseData = {
      data: response.data?.data,
      httpStatusCode: response.status,
    };
    // eslint-disable-next-line no-console
    console.log(
      {
        ...responseData,
      },
      'Response'
    );

    return Promise.resolve(responseData);
  } else {
    // eslint-disable-next-line no-console
    console.error(
      {
        problem: response.problem,
        httpStatusCode: response.status,
        data: response.data,
      },
      'Error'
    );

    const responseData = {
      data: response.data,
      httpStatusCode: response.status,
      problem: response.problem,
    };


    return Promise.reject(responseData);
  }
};
