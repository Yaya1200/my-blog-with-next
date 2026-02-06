import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your-username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const fakeUser = {
          id: "1",
          username: "admin",
          password: "1234",
          email: "admin@example.com",
        };

        if (
          credentials.username === fakeUser.username &&
          credentials.password === fakeUser.password
        ) {
          return {
            id: fakeUser.id,
            name: fakeUser.username,
            email: fakeUser.email,
          };
        }

        
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt", 
  },

  pages: {
    signIn: "/login", 
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };