import { FC } from "react";
import styles from './icons.module.css'

type Props = {
    color?: string
    filled?: boolean
}
export const HeartIcon: FC<Props> = ({
    color,
    filled,
}) => {
    const stroke = color ?? 'var(--darkest)'
    return <section className={styles.icon}>
        <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fill={filled ? stroke : ''} fillRule="evenodd" clipRule="evenodd" d="M12.4997 18.9911L9.5767 15.9911L6.6767 12.9911C5.10777 11.3331 5.10777 8.73809 6.6767 7.08009C7.44494 6.34175 8.48548 5.95591 9.54937 6.01489C10.6133 6.07387 11.6048 6.57236 12.2867 7.39109L12.4997 7.60009L12.7107 7.38209C13.3926 6.56336 14.3841 6.06487 15.448 6.00589C16.5119 5.94691 17.5525 6.33275 18.3207 7.07109C19.8896 8.72909 19.8896 11.3241 18.3207 12.9821L15.4207 15.9821L12.4997 18.9911Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
        </svg>
    </section>
}