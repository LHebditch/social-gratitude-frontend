import { Metadata } from "next";
import styles from "./page.module.css";
import Journal from "../components/journal"
import { getUserInfo } from "../utils/actions";
import IconNavigation from "../components/icon-navigation";
import { getEntries, getInfluenceScore } from "./actions";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Journal",
    description: "Your gratitude reflections for today",
};

export default async function JournalPage() {
    const { displayName } = await getUserInfo()
    const { score } = await getInfluenceScore()

    const todaysEntreis = await getEntries();

    return <section className={styles.page}>
        <hgroup className={styles.greeting}>
            <h1>Welcome,</h1>
            <h2>{displayName}</h2>
            <ScoreBadge score={score} />
        </hgroup>
        <section className={styles.entries}>
            <Journal storedEntries={todaysEntreis} />
        </section>
        <section className={styles.footer}>
            <IconNavigation active="journal" />
        </section>
    </section>
}

const ScoreBadge: FC<{ score: number }> = ({ score }) => {
    if (!score) return <></>
    return <section className={styles.influenceBadge}>
        <div className={styles.influenceBadgeScore}>
            <p>{score}</p>
        </div>
        <p className="subheader">You have inspired {score} people so far by sharing you&apos;re gratitude!</p>
    </section>
}