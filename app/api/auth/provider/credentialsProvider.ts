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
            const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

            if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
            } else {
                // If you return null or false then the credentials will be rejected
                return null
                // You can also Reject this callback with an Error or with a URL:
                // throw new Error('error message') // Redirect to error page
                // throw '/path/to/redirect'        // Redirect to a URL
            }
            // const res = await postSignIn({ email, password })
            // if (!res.data) return null

            // const profile = {
            //     ...res.data,
            // }

            // return profile;
        } catch (error) {
            return null;
        }


    },
})