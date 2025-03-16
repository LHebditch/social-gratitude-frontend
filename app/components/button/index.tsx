import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import styles from './button.module.css'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    aria: {
        label: string
    },
    fullWidth?: boolean
    variant?: string
}

export const Button: FC<Props> = ({
    children,
    aria,
    fullWidth,
    variant
}) => {
    return <>
        <button className={`${styles.button} ${fullWidth ? styles.full : ''} ${variant ? styles[variant] : ''}`} aria-label={aria.label}>{children}</button>
    </>
}

export default Button;