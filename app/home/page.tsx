import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Home",
    description: "Social gratitude",
};

export default async function HomePage() {
    return <section className={styles.page}>
        <hgroup className={styles.greeting}>
            <h1>Social gratitude</h1>
        </hgroup>
    </section>
}