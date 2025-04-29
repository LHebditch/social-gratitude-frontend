import { Metadata } from "next";
import styles from "./page.module.css";
import Journal from "../components/journal"
import { getEntries, getInfluenceScore, getStreak } from "./actions";
import { Welcome } from "../components/welcome";

export const metadata: Metadata = {
    title: "Journal",
    description: "Your gratitude reflections for today",
};

export default async function JournalPage() {
    const todaysEntreis = await getEntries();
    const { score } = await getInfluenceScore()
    const { streak } = await getStreak()

    return <section className={styles.page}>
        <Welcome score={score} />
        <section className={styles.entries}>
            <Journal storedEntries={todaysEntreis} streak={streak} />
        </section>
    </section>
}

