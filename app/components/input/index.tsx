import { FC, DetailedHTMLProps, InputHTMLAttributes, useId } from "react";
import styles from "./input.module.css";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label: string;
    labelDescription?: string;
    fullWidth?: boolean;
    asList?: boolean;
    aria: {
        description: string
    }
}

export const Input: FC<Props> = ({
    label,
    labelDescription,
    fullWidth,
    asList,
    aria,
    ...rest
}) => {
    const id = useId();

    return <>
        <section className={`${styles['input-container']} ${asList ? "" : styles.stacked}`}>
            <label htmlFor={id} aria-describedby={id + 'description'} className={styles.inputLabel}>{label}</label>
            {labelDescription && <p className="subheader light pb">{labelDescription}</p>}
            <input id={id} className={`${styles.input} ${fullWidth ? styles.full : ''}`} {...rest} />
        </section>
        <p className={styles['hidden-description']} id={id + 'description'}>{aria.description}</p>
    </>
}

export default Input;
