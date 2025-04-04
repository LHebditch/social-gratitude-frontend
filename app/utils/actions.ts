'use server'

import { cookies } from 'next/headers'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/utils/config/authOptions';

type UserInfo = {
    displayName: string
    email: string
}

export async function getAuthCookie() {
    const cookieStore = await cookies()
    const auth = cookieStore.get('x-auth-token')

    return auth;
}

export async function getUserInfo(): Promise<UserInfo> {
    const { user } = await getServerSession(authOptions) ?? {}

    if (!user) {
        return {} as UserInfo
    }

    return {
        displayName: user.name as string,
        email: user.email as string
    }
    // try {
    //     const auth = await getAuthCookie()

    //     const d = await fetch(`${process.env.AUTH_API_URL ?? ''}/me`, {
    //         method: 'GET',
    //         headers: {
    //             "Authorization": auth?.value ?? '',
    //         }
    //     })


    //     if (d.status != 200) {
    //         const err = await d.text()
    //         throw new Error(err)
    //     }
    //     const data = await d.json();
    //     return data as UserInfo;
    // } catch (e: unknown) {
    //     console.debug('Failed to get user info', (e as Error).message)
    //     return { displayName: '', email: '' }
    // }
}