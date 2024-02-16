import { auth } from "@/app/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials = { email: "", password: "" }) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const user = userCredential.user;

          // Return user object to be saved in the NextAuth session
          return {
            id: user.uid,
            email: user.email,
          };
        } catch (error) {
          console.error("Firebase auth error", error);
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 12 * 60 * 60, // 12 jam
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.user.id = token?.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
