import { Metadata } from "next";
import styles from "./page.module.css";
import { getReactions, getSocialEntries, type Reaction } from "./actions";
import { getAuthCookie, getUserInfo } from "../utils/actions";
import EntryItem from "../components/EntryItem";
import Button from "../components/button";
import { validateJWT } from "../utils/config/authOptions";

export const metadata: Metadata = {
    title: "Social",
    description: "Be inspired to stay grateful",
};

export default async function JournalPage() {
    const auth = await getAuthCookie()
    const loggedIn = await validateJWT(auth?.value ?? '');

    const { id } = await getUserInfo()
    const { entries, nextToken } = await getSocialEntries()
    const socialEntries = entries?.filter(e => e.userId != id) ?? []
    let likedEntries: Reaction[] = []

    if (loggedIn) {
        try {
            likedEntries = await getReactions(socialEntries)
        } catch (e: unknown) {
            console.warn('unable to get reaction: JWT potentially timed out', e)
        }
    }

    return <section className={styles.page}>
        <hgroup className={styles.header}>
            <h1>Inspiration</h1>
            <p className="subheader">See what others are grateful for</p>
        </hgroup>
        <section className={styles.entries}>
            {!socialEntries.length && <p className="cta">No shared entries avaiable...</p>}
            {
                socialEntries.map(e =>
                    <EntryItem
                        key={`${e.id}-${e.index}`}
                        entry={e}
                        loggedIn={loggedIn}
                        userId={id}
                        liked={!!likedEntries.some(r => r.id === e.id && `${e.index}` === r.index)} />
                )
            }
        </section>
        <section>
            {
                nextToken && <Button aria={{
                    label: "Load more inspiration"
                }}>Load more</Button>
            }
        </section>
    </section>
}
