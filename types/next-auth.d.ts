declare module "next-auth" {
    interface Session {
        user: {
        id: string;
        role?: string;
        email: string;
        name?: string;
        image?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role?: string;
    }
}
