'use server'

import { type JournalEntries } from "@/app/journal/actions"
import { getAuthCookie } from "@/app/utils/actions"


type SaveEntriesResponse = {
    id: string
}

export async function saveEntries(entries: JournalEntries): Promise<JournalEntries> {
    const auth = await getAuthCookie()

    const d = await fetch(`${process.env.GRATITUDE_API_URL ?? ''}/journal/entries`, {
        method: 'POST',
        body: JSON.stringify(entries),
        headers: {
            "Authorization": auth?.value ?? '',
        }
    })


    if (![200, 201].includes(d.status)) {
        const err = await d.text()
        throw new Error(err)
    }
    const { id } = await d.json() as SaveEntriesResponse;

    return {
        id,
        ...entries,
    }
}

export async function shareEntries(): Promise<void> {
    const auth = await getAuthCookie()

    const d = await fetch(`${process.env.GRATITUDE_API_URL ?? ''}/journal/entries/share`, {
        method: 'POST',
        headers: {
            "Authorization": auth?.value ?? '',
        }
    })


    if (d.status != 200) {
        const err = await d.text()
        throw new Error(err)
    }
}