import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { createUserIfNotExists, getUserByEmail } from "@/controllers/user.controller";
import type { User as NextAuthUser } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: NextAuthUser }) {
            if (!user.email) return false;
        
            const dbUser = await getUserByEmail(user.email);
            if (!dbUser) {
                await createUserIfNotExists({
                    email: user.email,
                    name: user.name,
                    image: user.image,
                });
            }
        
            return true;
        },

        async jwt({ token, user }) {
            if (user?.email) {
                const dbUser = await getUserByEmail(user.email);
                if(dbUser?._id){
                    token.id = dbUser?._id?.toString();
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id;
            }
            return session;
        },
        redirect() {
            return '/start';
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/',
        newUser: '/start',
      },
    theme: {
        colorScheme: "light",
        brandColor: "#2563eb",
        logo: "/images/buildoova-logo",
    },
});

export const { GET, POST } = handlers;