import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Home",
    description: "Social gratitude, be inspired to stay grateful",
};

export default async function HomePage() {
    return <section className={styles.page}>
        <hgroup className={styles.greeting}>
            <h1>Gratilog</h1>
        </hgroup>
    </section>
}