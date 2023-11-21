import { useAppContext } from '@/context/AppProvider';
import { postSignUp } from '@/network/api/api';
import { NOTIFICATION_VARIANT } from '@/utils/constants';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValue, UseFormReturn, useForm } from 'react-hook-form';

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
            isMode: false
        }
    })
    const { resetField, handleSubmit } = methods
    const [{ user }, dispatch] = useAppContext();
    const router = useRouter()
    const [isMode, setIsMode] = useState(false)


    const onSignGoogle = async () => {
        const res = await signIn('google', {
            redirect: false,
            callbackUrl: '/'
        });
        // const res = await signIn("credentials", {
        //     mode: 'google',
        //     callbackUrl: '/',
        //     redirect: false,
        // })
    }

    const onSignIn = handleSubmit(async (params: FromProps) => {
        try {
            const res = await signIn("credentials", {
                email: params.signIn.email,
                password: params.signIn.password,
                callbackUrl: '/',
                redirect: false,
            })
            if (res?.status === 200) {
                router.replace("/");
            } else {
                dispatch({
                    toastNotification: {
                        variant: NOTIFICATION_VARIANT.DANGEROUS,
                        message: 'Login failed',
                    },
                });
            }
        } catch (err: any) {
            dispatch({
                toastNotification: {
                    variant: NOTIFICATION_VARIANT.DANGEROUS,
                    message: 'Login failed',
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