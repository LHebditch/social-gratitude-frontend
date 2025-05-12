'use server'

import { getAuthCookie } from "../utils/actions";

export type SocialEntry = {
    entry: string;
    index: string;
    userId: string;
    id: string;
    likes: number;
}

type SocialResponse = {
    nextToken: string
    entries: SocialEntry[]
}

export async function getSocialEntries(): Promise<SocialResponse> {

    const d = await fetch(`${process.env.GRATITUDE_API_URL ?? ''}journal/social`, {
        method: 'GET',
    })

    if (d.status != 200) {
        console.error('error featching social entries: ', d)
        const err = await d.text()
        throw new Error(err)
    }

    const res = await d.json() as SocialResponse;

    return res
}

type ReactionResponse = {
    liked: string[]
}

export type Reaction = {
    id: string
    index: string
}

export async function getReactions(entries: SocialEntry[]): Promise<Reaction[]> {
    const auth = await getAuthCookie()
    const entryIds = entries.map(e => `${e.id}/${e.index}`)
    if (!entryIds.length) {
        return []
    }
    const d = await fetch(`${process.env.GRATITUDE_API_URL ?? ''}journal/reactions`, {
        method: 'POST',
        body: JSON.stringify({
            entries: entryIds
        }),
        headers: {
            "Authorization": auth?.value ?? '',
        }
    })

    if (d.status != 200) {
        console.error('error getting reactions', d)
        const err = await d.text()
        throw new Error(err)
    }

    const res = await d.json() as ReactionResponse;

    return res.liked.map(e => ({
        id: e.split('/')[0],
        index: e.split('/')[1]
    }))
}