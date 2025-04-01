import { Metadata } from "next";
import styles from "./page.module.css";
import { getReactions, getSocialEntries, Reaction } from "./actions";
import { getUserInfo } from "../utils/actions";
import IconNavigation from "../components/icon-navigation";
import EntryItem from "../components/EntryItem";

export const metadata: Metadata = {
    title: "Social",
    description: "Social gratitude, be inspired to stay grateful",
};

export default async function JournalPage() {
    const { email } = await getUserInfo()
    const socialEntries = await getSocialEntries()
    let likedEntries: Reaction[] = []
    const loggedIn = !!email;

    if (loggedIn) {
        likedEntries = await getReactions(socialEntries)
    }

    return <section className={styles.page}>
        <hgroup className={styles.header}>
            <h1>Inspiration</h1>
            <p className="subheader">See what others are grateful for</p>
        </hgroup>
        <section className={styles.entries}>

            {
                socialEntries.map(e =>
                    <EntryItem
                        key={`${e.id}-${e.index}`}
                        entry={e}
                        loggedIn={loggedIn}
                        liked={!!likedEntries.some(r => r.id === e.id && `${e.index}` === r.index)} />
                )
            }
        </section>
        <section className={styles.nav}>
            <IconNavigation active="social" />
        </section>
    </section>
}