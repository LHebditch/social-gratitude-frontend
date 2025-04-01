'use server'
import { getAuthCookie } from "@/app/utils/actions"

export async function react(entryId: string, index: number, creatorId: string): Promise<void> {
    const auth = await getAuthCookie()
    const d = await fetch(`${process.env.GRATITUDE_API_URL ?? ''}journal/reactions/react`, {
        method: 'POST',
        body: JSON.stringify({
            entryId,
            creatorId,
            index
        }),
        headers: {
            "Authorization": auth?.value ?? '',
        }
    })

    if (d.status != 200) {
        const err = await d.text()
        throw new Error(err)
    }
}