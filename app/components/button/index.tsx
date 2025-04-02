import { DetailedHTMLProps, FC, ButtonHTMLAttributes } from "react";
import styles from './button.module.css'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    aria: {
        label: string
    },
    fullWidth?: boolean
    variant?: string
    inline?: boolean
    cta?: boolean // is this a call to action button?
}

export const Button: FC<Props> = ({
    children,
    aria,
    fullWidth,
    variant,
    inline,
    cta,
    ...rest
}) => {

    return <>
        <button
            className={`
                ${styles.button + ' '}
                ${(fullWidth ? styles.full : '') + ' '}
                ${(variant ? styles[variant] : '') + ' '}
                ${(inline ? styles.inline : '') + ' '}
                ${(cta ? styles.cta : '') + ' '}`
            }
            aria-label={aria.label}
            {...rest}>
            {children}</button>
    </>
}

export default Button;