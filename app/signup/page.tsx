import { Metadata } from "next";
import styles from "./page.module.css";
import SignupForm from "../components/signup-form";

export const metadata: Metadata = {
    title: "Signup",
    description: "Social gratitude. Stay inspired to be grateful.",
};

export default function SignupPage() {
    return <section className={styles.page}>
        <SignupForm />
    </section>

}