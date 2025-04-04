import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';
import * as jose from 'jose'

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    expire_in: 43200 // 12 hours
                }
            }
        }),
    ],
    secret: process.env.JWT_SECRET,
    jwt: {
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, account }) {

            if (account?.id_token) {
                const cookieStore = await cookies()
                const jwt = await newJWT(token.email ?? '', token.sub ?? '')
                cookieStore.set('x-auth-token', jwt, {
                    httpOnly: true,
                    sameSite: true,
                })
            }

            return {
                ...token,
            }
        },
        async session({ token, session }) {
            const { name, email } = token

            return { ...session, user: { name, email } }
        },
        async redirect({ baseUrl }) {
            return baseUrl + '/journal'
        }
    }
};

// generate a JWT for our use!
const newJWT = async (email: string, sub: string): Promise<string> => {
    const jwt = await new jose.SignJWT({
        userId: sub,
        email,
        aud: process.env.JWT_AUD,
        iss: process.env.JWT_ISS,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(process.env.JWT_ISS ?? '')
        .setAudience(process.env.JWT_AUD ?? '')
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    return jwt;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
