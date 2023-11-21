import { postSignIn } from "@/network/api/api";
import CredentialsProvider from "next-auth/providers/credentials";

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
            console.log(`🚀 ~ file: credentialsProvider.ts ~ line 14 ~ authorize ~ res`, res)

            // const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/auth/login?mode=${mode}`, {
            //     method: "POST",
            //     body: JSON.stringify({ email, password }),
            //     headers: { "Content-Type": "application/json" },
            // });

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