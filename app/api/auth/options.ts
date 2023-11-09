import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import jwt from 'jsonwebtoken';
import { credentialsProvider, gitHubProvider, googleProvider } from "./provider";

export const authOptions: NextAuthOptions = {
  providers: [
    googleProvider,
    credentialsProvider,
    gitHubProvider
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    encode: ({ secret, token }) => {
      console.log(`🚀 ~ file: options.ts ~ line 24 ~ token`, token)
      const encodedToken = jwt.sign(
        {
          ...token,
          iss: process.env.ISSUER_URL,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret,
      )
      return encodedToken
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jwt.verify(token!, secret) as JWT
      return { ...decodedToken }
    }
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return true
      } else if (account?.provider === "github") {
        return true
      }
      return true
    },
    async session({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        if (
          c !== "iat" &&
          c !== "exp" &&
          c !== "jti" &&
          c !== "apiToken" &&
          c !== "accountToken"

        ) {
          return { ...p, [c]: token[c] }
        } else {
          return p
        }
      }, {})
      return Promise.resolve({ ...session, user: sanitizedToken }) 
    },
    async jwt({ token, user, account, profile }) {
      return { ...token, ...user };
    }
  },
  debug: false
};