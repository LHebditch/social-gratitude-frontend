import { cookies } from 'next/headers'

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
    const auth = await getAuthCookie()

    const d = await fetch(`${process.env.AUTH_API_URL ?? ''}/me`, {
        method: 'GET',
        headers: {
            "Authorization": auth?.value ?? '',
        }
    })


    if (d.status != 200) {
        const err = await d.text()
        throw new Error(err)
    }
    const data = await d.json();
    return data as UserInfo;
}