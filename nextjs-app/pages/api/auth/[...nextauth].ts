import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

export const authOptions = (req: NextApiRequest): NextAuthOptions => {
  return {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, _req) {
          const prisma = new PrismaClient();

          // Add logic here to look up the user from the credentials supplied
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.username,
            },
          });

          // if nothing is found with this e-mail
          // or if the user didn't enter the correct password
          // then do not authorize

          // note, wouldn't allow empty passwords in real setting
          if (
            !user ||
            !bcrypt.compareSync(credentials?.password ?? "", user.password)
          )
            return null;

          return user;
        },
      }),
    ],

    // note, in this scenario using database as strat (and implying to use prisma), won't work, not sure why, todo
    // I think Prisma would only be used when using an external provider (not credential), for credential only jwt would work I guess
    // not sure
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, account, user }) {
        token.id_token = account?.id_token;
        if (user) token.user = user;

        if (req.url === "/api/auth/session?update") {
          const newUser = await prisma.user.findFirst({
            where: {
              id: token.user.id,
            }
          })

          token.user = newUser;
        }

        return token;
      },
      async session({ session, token }) {
        session.token = token.id_token ?? "";
        session.user = token.user;

        return Promise.resolve(session);
      },
    },
  };
};

const authHandler = async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions(req));

export default authHandler;
