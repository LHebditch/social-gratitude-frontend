"use client"

import { FC } from "react";
import styles from './journal.module.css'
import TextArea from "../text-area";
import Button from "../button";

// type JournalEntries = {
//     entry1: string;
//     entry2: string;
//     entry3: string;
// }

export const Journal: FC = () => {
    return <form className={styles.form}>
        <hgroup className={styles.hgroup}>
            <h2 className={styles.title}>Today I am grateful for...</h2>
            <p className="subheader">Try to think of things that you have not mentioned recently. Head over to the <a aria-label="social" href="/social">social</a> page for inspiration.</p>
        </hgroup>
        <section className={styles.entry}>
            <TextArea header="Entry 1" fullWidth />
        </section>
        <section className={styles.entry}>
            <TextArea header="Entry 2" fullWidth />
        </section>
        <section className={styles.entry}>
            <TextArea header="Entry 3" fullWidth />
        </section>
        <section className={styles['button-group']}>
            <Button aria={{ label: "Share journal entries publically to inspire others" }} variant="secondary">Share</Button>
            <Button aria={{ label: "Save journal entries for today" }} >Save</Button>
        </section>
    </form>
}

export default Journal;