'use client'
import { FC } from 'react'
import styles from './welcome.module.css'
import { SessionProvider } from 'next-auth/react';

import { useSession } from 'next-auth/react';

export const Welcome: FC<{ score: number }> = ({ score }) => {
    return <SessionProvider>
        <Greeting score={score} />
    </SessionProvider>

}

const Greeting: FC<{ score: number }> = ({ score }) => {
    const { data: session } = useSession();
    const { user } = session ?? {}

    return <hgroup className={styles.greeting}>
        <h1>Welcome, </h1>
        < h2 > {user?.name} </h2>
        < ScoreBadge score={score} />
    </hgroup>
}

const ScoreBadge: FC<{ score: number }> = ({ score }) => {
    if (!score) return <></>

    return <section className={styles.influenceBadge}>
        <div className={styles.influenceBadgeScore}>
            <p>{score} </p>
        </div>
        < p className="subheader" > You have inspired {score} people so far by sharing your gratitude! </p>
    </section>
}