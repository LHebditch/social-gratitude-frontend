"use client"

import { FC } from "react"

import { signIn } from 'next-auth/react';
import styles from './form.module.css'

import Button from "../button";
import Image from 'next/image'

const GoogleAuth: FC = () => {

    const handleSignIn = async () => signIn('google');

    return <section className={styles.loginFormContainer}>
        <hgroup>
            <h1>Sign in to Gratilog</h1>
            <h2 className="subheader">Sign in with your google account</h2>
            <h2 className="subheader">We promise not to send you any emails!</h2>
        </hgroup>
        <Button
            onClick={handleSignIn}
            aria={{
                label: 'Sign in with google'
            }}

            variant="login"
        >
            <Image src="/google.png" height={25} width={25} alt="google logo" />
            Sign in with Google
        </Button>
    </section>
}
export function LoginForm() {
    return <>
        <GoogleAuth />
    </>
}


