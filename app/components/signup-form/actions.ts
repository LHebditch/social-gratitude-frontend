'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

type LoginResponse = {
    tokenId: string
}

type LoginCompleteResponse = {
    jwt: string
}

export async function registerAndLogin(email: string, displayName: string): Promise<LoginResponse> {
    // first register
    console.log('Start registration')
    const r = await fetch(`${process.env.AUTH_API_URL ?? ''}/register`, {
        method: 'POST',
        body: JSON.stringify({ email, displayName }),
    })
    if (r.status != 201) {
        const err = await r.text() ?? 'Failed with status: ' + r.status
        throw new Error(r.status === 409 ? 'TRY_LOGIN' : err)
    }
    console.log('Registration complete, initiate login')

    // check 409
    // then do login
    const d = await fetch(`${process.env.AUTH_API_URL ?? ''}/login`, {
        method: 'POST',
        body: JSON.stringify({ email }),
    })


    if (d.status != 200) {
        const err = await d.text() ?? 'Failed with status: ' + d.status
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