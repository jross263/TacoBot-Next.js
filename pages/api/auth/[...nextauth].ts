import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID  ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      authorization: { params: { scope: 'identify guilds' } },
    })
  ],
  callbacks:{
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        const headers =  { headers: { Authorization: `Bearer ${account.access_token}` } };
        const guilds = (await (await fetch('https://discord.com/api/users/@me/guilds',headers)).json()).filter((g:Guild) => g.owner);
        token.guilds = guilds;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.guilds = token.guilds;
      return session;
    }
  }
};

export default NextAuth(authOptions);