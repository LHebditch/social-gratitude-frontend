'use client'

import { SocialEntry } from "@/app/social/actions"
import { FC, useState } from "react"
import { HeartIcon } from "../icons/heart-icon"
import styles from './entryitem.module.css'
import { react } from "./actions"

type Props = {
    entry: SocialEntry
    loggedIn: boolean
    liked: boolean
    userId?: string
}

export const EntryItem: FC<Props> = ({ entry, loggedIn, liked, userId }) => {
    const [isLiked, setIsLiked] = useState(liked ?? false)

    const reactHandler = async () => {
        if (isLiked) return

        await react(entry.id, parseInt(entry.index, 10), entry.userId);
        setIsLiked(true)
    }

    if (userId === entry.userId) {
        return <></>
    }

    return <article className={styles.entry}>
        <p className={styles['icon-p']}> {entry.entry} </p>
        < p className={styles.icon} >
            {loggedIn &&
                <button className='icon-btn' disabled={isLiked} onClick={reactHandler} >
                    <HeartIcon color="var(--primary)" filled={isLiked} />
                </button>
            }
        </p>
    </article>
}

export default EntryItem
