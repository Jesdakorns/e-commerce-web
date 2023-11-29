'use client'

import { useAppContext } from '@/context/AppProvider';
import { postSignIn, postSignInGoogle, postSignUp } from '@/network/api/api';
import { NOTIFICATION_VARIANT } from '@/utils/constants';
import { useGoogleLogin } from '@react-oauth/google';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from 'react-hook-form';

export interface FromProps {
    signIn: {
        email: string
        password: string
    }
    signUp: {
        email: string
        password: string
        phone: string
        gender: string
    }
    isMode: boolean
    isSubmit: boolean
}


const useAuth = () => {
    const methods = useForm<FromProps>({
        defaultValues: {
            signIn: {
                email: undefined,
                password: undefined
            },
            signUp: {
                email: undefined,
                password: undefined,
                phone: undefined,
                gender: undefined
            },
            isMode: false,
            isSubmit: false
        }
    })
    const { resetField, handleSubmit } = methods
    const [{ user }, dispatch] = useAppContext();
    const router = useRouter()
    const [isMode, setIsMode] = useState(false)


    const onSignGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await postSignInGoogle({ accessToken: tokenResponse.access_token })
                if (res?.httpStatusCode === 201) {
                    const resLogin = await signIn("credentials", {
                        data: JSON.stringify(res?.data),
                        callbackUrl: '/',
                        redirect: false,
                    })
                    if (resLogin?.status === 200) {
                        router.replace("/");
                    }
                } else {
                    dispatch({
                        toastNotification: {
                            variant: NOTIFICATION_VARIANT.DANGEROUS,
                            message: 'Login failed',
                        },
                    });
                }
            } catch (error: any) {
                dispatch({
                    toastNotification: {
                        variant: NOTIFICATION_VARIANT.DANGEROUS,
                        message: error.problem === "NETWORK_ERROR" ? 'Sever Error' : 'Login failed',
                    },
                });
            }
        },
    });

    const onSignIn = handleSubmit(async (params: FromProps) => {
        try {
            const res = await postSignIn({
                email: params.signIn.email,
                password: params.signIn.password,
            })
            if (res?.httpStatusCode === 201) {
                const resLogin = await signIn("credentials", {
                    data: JSON.stringify(res?.data),
                    callbackUrl: '/',
                    redirect: false,
                })
                if (resLogin?.status === 200) {
                    router.replace("/");
                }
            } else {
                dispatch({
                    toastNotification: {
                        variant: NOTIFICATION_VARIANT.DANGEROUS,
                        message: 'Login failed',
                    },
                });
            }
        } catch (error: any) {
            dispatch({
                toastNotification: {
                    variant: NOTIFICATION_VARIANT.DANGEROUS,
                    message: error.problem === "NETWORK_ERROR" ? 'Sever Error' : 'Login failed',
                },
            });
        }

    })

    const onSignUp = handleSubmit(async (params: FromProps) => {
        const { email, password, phone, gender } = params.signUp
        try {

            const { httpStatusCode, data } = await postSignUp({ email, password, phone, gender })
            if (httpStatusCode === 201) {
                setIsMode(false)
                resetField("signUp")
                const res = await signIn("credentials", {
                    email,
                    password,
                    callbackUrl: '/',
                    redirect: false,
                })
                if (res?.status === 200) {
                    router.replace("/");
                }
            }

        } catch (err: any) {
            dispatch({
                toastNotification: {
                    variant: NOTIFICATION_VARIANT.DANGEROUS,
                    message: err?.data?.message
                },
            });
        }

    })

    const onChangeMode = () => {
        resetField("signIn")
        resetField("signUp")
        setIsMode(prev => !prev)
    }

    return { methods, isMode, onChangeMode, onSignIn, onSignUp, onSignGoogle }
}

export default useAuth