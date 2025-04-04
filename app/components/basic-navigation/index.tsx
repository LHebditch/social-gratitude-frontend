'use client'

import { FC, useState } from "react";
import { MenuIcon } from "../icons/menu-icon";
import styles from './navigation.module.css'
import { CrossIcon } from "../icons/cross-icon";
import IconNavigation from "../icon-navigation";
import Button from "../button";
import { signOut as localSignOut } from "./actions";
import { signOut } from 'next-auth/react';

export const Navigation: FC = () => {
    const [showMenu, setShowMenu] = useState(false)

    const signout = async () => {
        setShowMenu(false)
        await localSignOut()
        await signOut()
    }

    return <>
        <section className={styles.navigation}>
            <button className={`icon-btn shadowed m0`} onClick={() => setShowMenu(!showMenu)}>
                <MenuIcon />
            </button>
        </section>

        <section className={`${styles.sidebar} ${showMenu ? styles.sidebarOn : ''}`}>
            {showMenu && <>
                <section>
                    <button className={`icon-btn m0 ${styles.closeButton}`} onClick={() => setShowMenu(!showMenu)}>
                        <CrossIcon />
                        <p>Close</p>
                    </button>
                </section>
                <IconNavigation active="none" vertical />
                <Button className={`${styles.signout} icon-btn`} aria={{ label: 'Sign out' }} onClick={signout}>Sign out</Button>
            </>}
        </section>

        <section className={styles.buffer}></section>
    </>
}

export default Navigation