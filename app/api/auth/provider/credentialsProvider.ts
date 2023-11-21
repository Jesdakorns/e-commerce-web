import { postSignIn } from "@/network/api/api";
import CredentialsProvider from "next-auth/providers/credentials";
import debug from 'debug';

const log = debug('app:auth');
export const credentialsProvider = CredentialsProvider({
    name: "credentials",
    credentials: {},
    async authorize(credentials) {
        const { email, password } = credentials as {
            email: string,
            password: string,
        };
        console.log(`🚀 ~ file: credentialsProvider.ts ~ line 12 ~ authorize ~ email, password`, email, password)
        // const res = await postSignIn({ email, password })
        // console.log(`🚀 ~ file: credentialsProvider.ts ~ line 17 ~ authorize ~ res`, res)
        // log('Credentials:', res);
        console.log(`🚀 ~ file: credentialsProvider.ts ~ line 23 ~ authorize ~ process.env.NEXT_PUBLIC_API_BASE_URL`, process.env.NEXT_PUBLIC_API_BASE_URL)
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json());
        console.log(`🚀 ~ file: credentialsProvider.ts ~ line 23 ~ authorize ~ res`, res)
        try {


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