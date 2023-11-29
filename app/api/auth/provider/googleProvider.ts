import { postSignInGoogle } from "@/network/api/api";
import { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const googleProvider = GoogleProvider({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '',
    authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
        }
    }
})