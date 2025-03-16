"use client"

import { useState } from "react"
import { commenceLogin, completeLogin } from "./actions";
import Input from "../input";
import Button from "../button";
import styles from './form.module.css'

export function LoginForm() {
    const [otpRequested, setOtpRequested] = useState(false)
    const [email, setEmail] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [otpError, setOTPError] = useState(false)

    const requestOTP = async (e: FormData) => {
        setEmailError(false)
        try {
            const email = e.get('email')?.toString() ?? 'NONE'
            const { tokenId: tid } = await commenceLogin(email)
            setOtpRequested(true)
            setTokenId(tid)
            setEmail(email)
        } catch (e: unknown) {
            console.warn(e)
            setEmailError(true)
        }
    }

    const doLogin = async (e: FormData) => {
        setOTPError(false)
        try {
            const token = e.get('token')?.toString() ?? 'NONE'
            // succesful completion redirects
            await completeLogin(tokenId, email, token)
        } catch (e: unknown) {
            console.warn(e)
            setOTPError(true)
        }
    }

    const buttonText = otpRequested ? 'Submit' : 'Login'
    const buttonLabel = otpRequested ? 'Submit one off token' : 'Login'

    return <form className={styles.form} action={otpRequested ? doLogin : requestOTP}>
        <section>
            {!otpRequested ?
                <>
                    <Input name="email" type="email" label="Email" fullWidth aria={{ description: "Please enter email" }} />
                    {emailError && <p className="error-message">Email not recognised</p>}
                </>
                :
                <>
                    <p>We have sent a token to the email provided</p>
                    <Input name="token" type="string" label="Token" fullWidth aria={{ description: "Please enter one off token" }} />
                    {otpError && <p className="error-message">Incorrect token value</p>}
                </>
            }
        </section>
        <section>
            <Button aria={{ label: buttonLabel }} fullWidth>{buttonText}</Button>
        </section>
    </form>
}


