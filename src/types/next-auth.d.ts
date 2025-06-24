import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            userId?: number;
            firstName?: string;
            lastName?: string;
            fullName?: string;
            nickName?: string;
            email?: string;
            avatar?: string;
            company?: string;
            directManagerName?: string;
            directManagerEmployeeNo?: number;
        };
    }

    interface User {
        userId?: number;
        firstName?: string;
        lastName?: string;
        fullName?: string;
        nickName?: string;
        email?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        userId?: number;
        firstName?: string;
        lastName?: string;
        fullName?: string;
        nickName?: string;
        email?: string;
        avatar?: string;
        company?: string;
        directManagerName?: string;
        directManagerEmployeeNo?: number;
    }
}
