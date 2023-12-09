import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

type TSession = Session & {

    accessToken?: string | null

} | null


export const getAccessSSRToken = () => {
    try {

        const cookieStore = cookies()
        const token = cookieStore.get(process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token')?.value || ''
        const decodedToken = jwt.verify(token, `${process.env.NEXT_PUBLIC_NEXTAUTH_SECRET}`) as TSession

        let accountToken = ''
        if (decodedToken?.accessToken) {
            accountToken = decodedToken?.accessToken as string
        }
        return accountToken

    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};
