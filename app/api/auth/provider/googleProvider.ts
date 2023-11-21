import { postSignInGoogle } from "@/network/api/api";
import { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const googleProvider = GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
        }
    },
    async profile(profile, tokens): Promise<User & { accessToken?: string, refreshToken?: string }> {
        console.log(profile, tokens)
        const user = await postSignInGoogle({ email: profile?.email || '', name: profile?.name || '', image: profile?.picture || '' })
        return {
            id: user?.data?.id ?? '',
            name: user?.data?.name ?? '',
            email: user?.data?.email ?? '',
            image: user?.data?.image ?? '',
            accessToken: user?.data?.accessToken ?? '',
            refreshToken: user?.data?.refreshToken ?? ''

        }
    }
})