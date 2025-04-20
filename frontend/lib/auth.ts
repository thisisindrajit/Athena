import { betterAuth } from "better-auth";
import { db } from "@/lib/database";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: db,
  trustedOrigins: (process.env.TRUSTED_ORIGINS as string).split(","),
  // Cache session in the browser for 5 minutes
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
});

// export type Session = typeof auth.$Infer.Session;