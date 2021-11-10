import { profile } from 'console'
import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export default NextAuth({
  providers: [
   DiscordProvider({
       clientId: process.env.DISCORD_CLIENT_ID,
       clientSecret: process.env.DISCORD_CLIENT_SECRET,
       scope: 'identify email guilds',
   })
  ],
  callbacks:{
    async jwt(token, user, account, profile, isNewUser) {      
      if(account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token    
    },
    async session(session, token) {
      session.accessToken = token.accessToken
      return session
    }
  }
})