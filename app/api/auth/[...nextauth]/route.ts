import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";


import { getUserByEmail, createUserIfNotExists } from "@/lib/db";

const handler = NextAuth({
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
        async signIn({ user }) {
            const dbUser = await getUserByEmail(user.email);

            if (!dbUser) {
                await createUserIfNotExists(user);
            }

            return true; 
        },

        async jwt({ token, user }) {
            if (user) {
                const dbUser = await getUserByEmail(user.email);
                token.id = dbUser?.id;
                token.role = dbUser?.role;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    theme: {
        colorScheme: "light",
        brandColor: "#2563eb",
        logo: "@/assets/images/buildoova-logo.png",
    },
});

export { handler as GET, handler as POST };
