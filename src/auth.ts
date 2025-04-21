import NextAuth from "next-auth";
import { PrismaClient } from "./generated/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";

// Define types for extended user with role
declare module "next-auth" {
  interface User {
    id: string;
    role?: "USER" | "ADMIN";
  }

  interface Session {
    user: User & {
      id: string;
      role?: "USER" | "ADMIN";
    };
  }
}

// Initialize Prisma client
const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email: email }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          password, 
          user.password
        );

        if (!isPasswordValid) {
          return null;
        } 

        return {
          id: user.id.toString(), // Ensure id is a string
          email: user.email,
          name: user.name ?? "",
          image: user.image ?? "",
          role: user.role
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
