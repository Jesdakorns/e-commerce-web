import { postSignIn } from "@/network/api/api";
import CredentialsProvider from "next-auth/providers/credentials";
import debug from 'debug';

const log = debug('app:auth');
export const credentialsProvider = CredentialsProvider({
    name: "credentials",
    credentials: {},
    async authorize(credentials) {
        try {
            const { email, password } = credentials as {
                email: string,
                password: string,
            };
            const res = await postSignIn({ email, password })
            log('Credentials:', res);

            // const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/auth/login?mode=${mode}`, {
            //     method: "POST",
            //     body: JSON.stringify({ email, password }),
            //     headers: { "Content-Type": "application/json" },
            // });

            if (!res.data) return null

            const profile = {
                ...res.data,
            }

            return null;
        } catch (error) {
            return null;
        }


    },
})