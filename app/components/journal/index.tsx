"use client"

import { ChangeEventHandler, FC, useActionState, useEffect, useState } from "react";
import styles from './journal.module.css'
import TextArea from "../text-area";
import Button from "../button";
import { saveEntries, shareEntries } from "./actions";
import { type JournalEntries } from "@/app/journal/actions";

type EntryChanges = {
    entry1: boolean
    entry2: boolean
    entry3: boolean
}

type Props = {
    storedEntries?: JournalEntries,
}

const emptyChangeObject = { entry1: false, entry2: false, entry3: false }
const emptyJournalObject = { entry1: '', entry2: '', entry3: '' }

export const Journal: FC<Props> = ({
    storedEntries,
}) => {
    const [saved, setSaved] = useState(!!storedEntries?.entry1 || !!storedEntries?.entry2 || !!storedEntries?.entry3)
    const [changes, setChanges] = useState<EntryChanges>(emptyChangeObject)

    const saveSubmissions = async (prev: JournalEntries, e: FormData) => {
        const newEntries = {
            entry1: e.get('entry1')?.toString() ?? '',
            entry2: e.get('entry2')?.toString() ?? '',
            entry3: e.get('entry3')?.toString() ?? '',
            id: prev.id,
        }
        const savedEntries = await saveEntries(newEntries)
        return savedEntries
    }

    const shareHandler = async () => {
        // todo something around if it's been shared already...
        await shareEntries()
    }

    const [entries, saveAction, savePending] = useActionState<JournalEntries, FormData>(saveSubmissions, storedEntries ?? emptyJournalObject)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, shareAction, sharePending] = useActionState(shareHandler, null)

    useEffect(() => {
        setSaved(!!entries.id)
        setChanges(emptyChangeObject)
    }, [entries])

    const triggerChangeHappened: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const { value, name } = e.target
        const k = name as keyof JournalEntries
        const kk = k as keyof EntryChanges;
        const newChanges = {
            ...changes,
        }

        newChanges[kk] = entries[k] !== value
        setChanges(newChanges)
    }

    const hasChanges = changes.entry1 || changes.entry2 || changes.entry3

    return <form className={styles.form} action={saveAction}>
        <hgroup className={styles.hgroup}>
            <h2 className={styles.title}>Today I am grateful for...</h2>
            <p className="subheader">
                Try to think of things that you have not mentioned recently.
                {' '}
                Head over to the <a aria-label="social" href="/social">social</a> page for inspiration.
            </p>
        </hgroup>
        <section className={styles.entry}>
            <TextArea header="1." fullWidth name="entry1" onChange={triggerChangeHappened} value={entries.entry1} />
        </section>
        <section className={styles.entry}>
            <TextArea header="2." fullWidth name="entry2" onChange={triggerChangeHappened} value={entries.entry2} />
        </section>
        <section className={styles.entry}>
            <TextArea header="3." fullWidth name="entry3" onChange={triggerChangeHappened} value={entries.entry3} />
        </section>
        <section className={styles['button-group']}>
            <Button
                aria={{ label: "Share journal entries publically to inspire others" }}
                variant="secondary"
                disabled={!saved || hasChanges || sharePending}
                formAction={shareAction}>
                {sharePending ? '...' : 'Share'}
            </Button>

            <Button
                aria={{ label: "Save journal entries for today" }}
                disabled={savePending}>
                {savePending ? '...' : 'Save'}
            </Button>
        </section>
    </form>
}

export default Journal;