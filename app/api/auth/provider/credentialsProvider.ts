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
        try {
            const res = await postSignIn({ email, password })
            if (!res.data) return null

            const profile = {
                ...res.data,
            }

            return profile;
        } catch (error) {
            return null;
        }


    },
})