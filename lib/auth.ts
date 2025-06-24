// lib/auth.ts
import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions, JWT } from "next-auth";
import { getUserDetails } from "@/src/lib/data/userService";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;
    const params = new URLSearchParams({
      client_id:     process.env.AZURE_AD_CLIENT_ID!,
      client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
      grant_type:    "refresh_token",
      refresh_token: token.refreshToken as string,
      scope:         "openid profile email offline_access Calendars.Read",
    });

    const res = await fetch(url, {
      method: "POST",
      body:   params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const refreshed = await res.json();

    if (!res.ok) throw refreshed;

    return {
      ...token,
      accessToken:        refreshed.access_token,
      // expires_in is seconds until expiry, so add to now
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken:       refreshed.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("🔄 Error refreshing Azure AD token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId:     process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId:     process.env.AZURE_AD_TENANT_ID as string,
      authorization: {
        params: {
          scope: "openid profile email offline_access Calendars.Read",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // On initial sign-in, store tokens & user info in the JWT
    async jwt({ token, account, profile }) {
      if (account && profile?.email) {
        const dbUser = await getUserDetails(profile.email);
        Object.assign(token, {
          userId:             dbUser.employee_No,
          firstName:          dbUser.firstName,
          lastName:           dbUser.lastName,
          fullName:           dbUser.fullName,
          nickName:           dbUser.nickname,
          company:            dbUser.company,
          avatar:             dbUser.avatar,
          directManagerName:  dbUser.directManagerName,
          directManagerEmployeeNo: dbUser.directManagerEmployee_No,
        });
      }
      if (account?.access_token) {
        token.accessToken        = account.access_token;
        token.refreshToken       = account.refresh_token;
        // account.expires_at is epoch seconds
        token.accessTokenExpires = (account.expires_at as number) * 1000;
      }

      // If token still valid, return it
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Otherwise refresh it
      return refreshAccessToken(token);
    },

    // Make the accessToken and userId available in session
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user ||= {} as any;
      Object.assign(session.user, {
        userId:      token.userId,
        firstName:   token.firstName,
        lastName:    token.lastName,
        fullName:    token.fullName,
        nickName:    token.nickName,
        company:     token.company,
        avatar:      token.avatar,
        directManagerName:        token.directManagerName,
        directManagerEmployeeNo:  token.directManagerEmployeeNo,
      });
      return session;
    },
  },
  debug: false,
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code, ...args) {
      if (code !== "DEBUG_ENABLED") console.warn(code, ...args);
    },
    debug() {
      // no-op
    },
  },
};
