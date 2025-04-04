"use client"

import { ChangeEvent, DetailedHTMLProps, FC, TextareaHTMLAttributes, useEffect, useId, useRef, useState } from "react";
import styles from './textarea.module.css'

type Props = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
    header: string
    fullWidth?: boolean
}

export const TextArea: FC<Props> = ({
    header,
    fullWidth,
    onChange,
    value: initialValue,
    ...rest
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [value, setValue] = useState(initialValue)
    const id = useId()

    useEffect(() => {
        if (textAreaRef && textAreaRef.current) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.current.style.height = "0px";
            // now resize text are to desire height
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [textAreaRef, value])

    const internalOnChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(ev.target.value)
        if (!!onChange) {
            onChange(ev)
        }
    }

    return <section className={styles.container}>
        <label className={styles.header} htmlFor={id}>{header}</label>
        <textarea
            className={`${styles.textarea} ${fullWidth ? styles.full : ''}`}
            ref={textAreaRef}
            value={value}
            onChange={internalOnChange}
            rows={1}
            placeholder="Write..."
            {...rest}
            id={id}
        />
    </section>
}

export default TextArea;