import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import * as jose from 'jose'


type JWTInfo = {
    iss: string
    aud: string
    userId: string
}
export async function middleware(request: NextRequest) {
    console.log('CHECKING JWT')
    const authToken = request.cookies.get('x-auth-token')
    if (!authToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    let decoded: JWTInfo
    try {
        decoded = await checkJWT(authToken!.value)
    } catch (e: unknown) {
        console.error('failed to verify auth token', e)
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = NextResponse.next()
    response.headers.set('userId', decoded.userId)
    // this can then be referenced in components as such
    // const h = await headers()
    // const userId = h.get("userId")

    return response
}

const checkJWT = async (token: string): Promise<JWTInfo> => {
    console.log("secret:" + process.env.JWT_SECRET)
    const decoded = await jose.jwtVerify<JWTInfo>(token, new TextEncoder().encode(process.env.JWT_SECRET))

    if (decoded.payload?.aud != process.env.JWT_AUD) {
        throw new Error("JWT aud does not match")
    }

    if (decoded.payload?.iss != process.env.JWT_ISS) {
        throw new Error("JWT issuer does not match")
    }

    return decoded.payload
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/journal'],
}