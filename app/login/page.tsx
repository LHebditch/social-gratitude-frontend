import { LoginForm } from "../components/login-form";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Generated by create next app",
};

export default function LoginPage() {
    return <section className={styles.page}>
        <LoginForm />
    </section>
}