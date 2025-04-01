import { DetailedHTMLProps, FC, ButtonHTMLAttributes } from "react";
import styles from './button.module.css'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
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
    variant,
    ...rest
}) => {
    return <>
        <button className={`${styles.button} ${fullWidth ? styles.full : ''} ${variant ? styles[variant] : ''}`} aria-label={aria.label} {...rest}>{children}</button>
    </>
}

export default Button;