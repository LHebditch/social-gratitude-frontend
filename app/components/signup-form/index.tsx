'use client'

import { FC, useState } from "react";
import styles from './signupform.module.css'
import Input from "../input";
import Button from "../button";
import { completeLogin, registerAndLogin } from "./actions";

export const SignupForm: FC = () => {
    const [otpRequested, setOtpRequested] = useState(false)
    const [email, setEmail] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [signupError, setSignupError] = useState('')

    const register = async (e: FormData) => {
        setSignupError('')
        try {
            const email = e.get('email')?.toString() ?? 'NONE'
            const display = e.get('displayname')?.toString() ?? 'NONE'
            const { tokenId: tid } = await registerAndLogin(email, display)
            setOtpRequested(true)
            setTokenId(tid)
            setEmail(email)
        } catch (e: unknown) {
            if ((e as Error).message === "TRY_LOGIN") {
                setSignupError('Email already in use')
            } else {
                console.warn(e)
                setSignupError('An error occured')
            }
        }
    }

    const doLogin = async (e: FormData) => {
        setSignupError('')
        try {
            const token = e.get('token')?.toString() ?? 'NONE'
            // succesful completion redirects
            await completeLogin(tokenId, email, token)
        } catch (e: unknown) {
            if ((e as Error).message !== 'NEXT_REDIRECT') {
                console.warn(e)
                setSignupError('Invalid token')
            }
        }
    }

    const buttonText = otpRequested ? 'Confirm' : 'Signup'
    const buttonLabel = otpRequested ? 'Submit one off token' : 'Signup'

    return <form className={styles.form} action={otpRequested ? doLogin : register}>
        <section>
            {!otpRequested && <>
                <Input name="email" type="email" label="Email" fullWidth aria={{ description: "Please enter email" }} />
                <Input name="displayname" type="text" label="Display Name" fullWidth aria={{ description: "Please enter a display name" }} />
            </>}
            {otpRequested && <>
                <Input name="token" type="string" label="Token" labelDescription="We have sent a token to the email provided" fullWidth aria={{ description: "Please enter one off token" }} />
            </>}
        </section >
        <section>
            {signupError && <p className="error-message">Registration failed: {signupError}</p>}
            <Button aria={{ label: buttonLabel }} fullWidth>{buttonText}</Button>
        </section>
    </form >
}

export default SignupForm