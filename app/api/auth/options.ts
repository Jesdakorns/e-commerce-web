import { NextAuthOptions, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import jwt from 'jsonwebtoken';
import { credentialsProvider, gitHubProvider, googleProvider } from "./provider";
import { postSignInGoogle } from "@/network/api/api";
import { AdapterUser } from "next-auth/adapters";
import debug from 'debug';

const log = debug('app:auth');
type TPicture = Profile & {
  picture?: string
} | undefined

type TUser = User & {
  accessToken: string
  refreshToken: string
} | AdapterUser


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
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    encode: ({ secret, token }) => {
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
      const _profile: TPicture = profile
      if (account?.provider === "google") {
        return true
      } else if (account?.provider === "github") {
        return true
      }
      return true
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token = { ...user }
      }

      // if (account?.provider === 'google') {
      //   const _profile: TPicture = profile
      //   const _user = await postSignInGoogle({ email: _profile?.email || '', name: _profile?.name || '', image: _profile?.picture || '' })
      //   log('{ ..._user.data }', { ..._user.data })
      //   token.id = _user.data?.id
      //   token.email = _user.data?.email
      //   token.name = _user.data?.name
      //   token.image = _user.data?.image
      //   token.accessToken = _user.data?.accessToken
      //   token.refreshToken = _user.data?.refreshToken

      // }

      delete token.picture
      return { ...token };
    },
    async session({ session, token }) {
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

  },
  debug: true
};