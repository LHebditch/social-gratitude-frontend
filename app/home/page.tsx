import { Metadata } from "next";
import styles from "./page.module.css";
import Button from "../components/button";
import SmileyIcon from "../components/icons/smiley-icon";
import GroupIcon from "../components/icons/group-icon";
import CalendarIcon from "../components/icons/calendar-icon";
import MedalIcon from "../components/icons/medal-icon";
import LogIcon from "../components/icons/log-icon";
import ShareIcon from "../components/icons/share-icon";

export const metadata: Metadata = {
    title: "Home",
    description: "Social gratitude. Stay inspired to be grateful.",
};

export default async function HomePage() {
    return <section className={styles.page}>

        <section className={styles.main}>
            <section className={styles.cta}>
                <hgroup className={styles.greeting}>
                    <h1>Transform Your Mindset With Gratitude</h1>
                    <h2 className="subheader">Journaling meets community<span className="only-full"> - track what you&apos;re grateful for</span></h2>
                    <h2 className="subheader">Share daily moments, and stay inspired by others</h2>
                </hgroup>

                <a href="/login">
                    <Button
                        aria={{ label: "Signup to Gratilog" }}
                        cta>
                        Start Your Gratitude Journey
                    </Button>
                </a>
            </section>
            <section className={styles.content}>
                <section className={styles.ctaSection}>
                    <h2>Why Gratitude Journaling works</h2>

                    <ul className={styles.threePointlist}>
                        <li>
                            <div className={styles.icon}>
                                <SmileyIcon />
                            </div>
                            <h3>Boosts Happiness</h3>
                            <p>Journaling reviews you brain for positivity</p>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <GroupIcon />
                            </div>
                            <h3>Strengthens Connections</h3>
                            <p>Share gratitude with a like-minded community</p>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <CalendarIcon />
                            </div>
                            <h3>Build a Lasting Habit</h3>
                            <p>Stay consistent with social motivation</p>
                        </li>
                    </ul>
                </section>

                <section className={styles.ctaSection}>
                    <h2>Simple. Meaningful. Impactful.</h2>
                    <ul className={styles.threePointlist}>
                        <li>
                            <div className={styles.icon}>
                                <LogIcon />
                            </div>
                            <p>1. Write down what you&apos;re grateful for</p>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <ShareIcon />
                            </div>
                            <p>2. Choose to keep it private or share it with the community</p>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <MedalIcon />
                            </div>
                            <p>3. Get inspired by others. Keep your streak going</p>
                        </li>
                    </ul>
                </section>

                <section className={styles.ctaSection}>
                    <h2>A Gratitude Journal That Evolves With You</h2>
                    <a href="/login">
                        <Button
                            aria={{ label: "Signup to Gratilog" }}
                            cta>
                            Start Your Gratitude Journey
                        </Button>
                    </a>
                </section>
            </section>
        </section>
    </section >
}