import { FC, ReactElement } from "react";
import styles from './icon-navigation.module.css'
import { HomeIcon } from "./icons/home-icon";
import { JournalIcon } from "./icons/journal-icon";
import { SocialIcon } from "./icons/social-icon";

export type Icon = 'home' | 'social' | 'journal';

// icons were found here: https://www.svgrepo.com/collection/xnix-circular-interface-icons/8

type Props = {
    active: Icon,
}

export const IconNavigation: FC<Props> = ({
    active,
}) => {
    const icons: Icon[] = ['journal', 'home', 'social']
    const orderedIcons = reorderIcons(icons, active)
    return <nav className={styles.navigation}>
        {orderedIcons.map(i => <a
            key={i}
            className={`${styles.icon} ${i === active ? styles.active : active}`}
            aria-label={`Go to ${i} page`}
            href={i === active ? '#' : `/${i}`}
        >
            {getIcon(i, i === active)}
        </a>)}
    </nav>
}

const getIcon = (current: string, isActive: boolean): ReactElement => {
    const activeColor = 'var(--secondary)'
    switch (current) {
        case 'home': return <HomeIcon color={isActive ? activeColor : undefined} />
        case 'journal': return <JournalIcon color={isActive ? activeColor : undefined} />
        case 'social': return <SocialIcon color={isActive ? activeColor : undefined} />
    }

    return <></>
}

export const reorderIcons = (icons: Icon[], active: Icon): Icon[] => {
    const middleindex = Math.floor(icons.length / 2)
    const activeIndex = icons.indexOf(active)
    if (activeIndex == -1) {
        console.warn('navigation icon not found in list')
        return icons
    }

    const resultingArray: Icon[] = []
    // so if the middle index of an array of 3 is 1 
    // and the index of active is 2 then the acvtive index is one to the right
    // so we need to move one to the right
    const diff = -(activeIndex - middleindex)
    for (let i = 0; i < icons.length; i++) {
        if (i + diff == -1) {
            resultingArray[icons.length - 1] = icons[i]
        } else if (i + diff == icons.length) {
            resultingArray[0] = icons[i]
        } else {
            resultingArray[i + diff] = icons[i]
        }
    }

    return resultingArray
}

export default IconNavigation
