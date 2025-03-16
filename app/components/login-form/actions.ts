'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

type LoginResponse = {
    tokenId: string
}

type LoginCompleteResponse = {
    jwt: string
}

export async function commenceLogin(email: string): Promise<LoginResponse> {
    const d = await fetch(`${process.env.AUTH_API_URL ?? ''}/login`, {
        method: 'POST',
        body: JSON.stringify({ email }),
    })


    if (d.status != 200) {
        const err = await d.text()
        throw new Error(err)
    }
    const data = await d.json();
    return data as LoginResponse;
}

export async function completeLogin(tokenId: string, email: string, token: string): Promise<void> {
    const d = await fetch(`${process.env.AUTH_API_URL ?? ''}/login/${tokenId}`, {
        method: 'POST',
        body: JSON.stringify({ email, token }),
    })
    if (d.status != 200) {
        const err = await d.text()
        throw new Error(err)
    }
    const { jwt } = await d.json() as LoginCompleteResponse
    const cookieStore = await cookies()
    cookieStore.set('x-auth-token', jwt, {
        httpOnly: true,
        sameSite: true,
    })
    redirect('/journal')
}