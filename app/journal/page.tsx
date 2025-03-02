import { headers } from 'next/headers'

export default async function Journal(){
    const h = await headers()
    const userId = h.get("userId")
    return <>
        <p>Welcome {userId}</p>
        <p>See below today&apos;s journal</p>
    </>
}