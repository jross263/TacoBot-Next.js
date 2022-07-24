import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from 'next-auth/providers/discord'

export const authOptions: NextAuthOptions = {
  providers: [
   DiscordProvider({
       clientId: process.env.DISCORD_CLIENT_ID  ?? '',
       clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
   })
  ],
  callbacks:{
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  }
}

export default NextAuth(authOptions)