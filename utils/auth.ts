import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

type TSession = Session & {
    user?: {
        accessToken?: string | null
    }
} | null


export const getAccessToken = async () => {
    try {
        const session: TSession = await getSession()
        let accountToken = ''
        if (session?.user?.accessToken) {
            accountToken = session?.user?.accessToken as string
        }
        return accountToken

    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};
