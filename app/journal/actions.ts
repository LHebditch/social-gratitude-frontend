'use server'

import { getAuthCookie } from "@/app/utils/actions";

export type JournalEntries = {
    entry1: string;
    entry2: string;
    entry3: string;
    id?: string
}

export async function getEntries(): Promise<JournalEntries> {
    const auth = await getAuthCookie()

    const d = await fetch(`${process.env.GRATITUDE_API_URL ?? ''}journal/today`, {
        method: 'GET',
        headers: {
            "Authorization": auth?.value ?? '',
        }
    })

    if (d.status != 200) {
        const err = await d.text()
        console.error(d)
        throw new Error(err)
    }

    const res = await d.json() as JournalEntries;

    return res
}

export async function getInfluenceScore(): Promise<{ score: number }> {
    const auth = await getAuthCookie()

    const d = await fetch(`${process.env.GRATITUDE_API_URL ?? ''}journal/reactions/influence`, {
        method: 'GET',
        headers: {
            "Authorization": auth?.value ?? '',
        }
    })

    if (d.status != 200) {
        const err = await d.text()
        throw new Error(err)
    }

    const res = await d.json() as { score: number };

    return res
}