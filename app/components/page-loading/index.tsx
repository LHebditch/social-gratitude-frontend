import { FC } from "react";
import styles from './loading.module.css'

export const PageLoading: FC = () => {
    const quotes = [
        newQuote('Gratitude is the memory of the heart', 'Jean Baptiste Massieu'),
        newQuote(
            'If the only prayer you said in your whole life was, "thank you," that would suffice',
            'Meister Eckhart'
        ),
        newQuote('God gave you a gift of 86,400 seconds today. Have you used one to say "thank you?"', 'William A. Ward'),
        newQuote('Silent gratitude isn\'t much use to anyone', 'G.B. Stern'),
        newQuote('Things turn out best for people who make the best of the way things turn out', 'John Wooden'),
        newQuote('Showing gratitude is one of the simplest yet most powerful things humans can do for each other', 'Randy Pausch'),
        newQuote('Gratitude is not only the greatest of virtues, but the parent of all others', 'Cicero'),
        newQuote('When we give cheerfully and accept gratefully, everyone is blessed', 'Maya Angelou'),
        newQuote('I am happy because I’m grateful. I choose to be grateful. That gratitude allows me to be happy', 'Will Arnett'),
        newQuote('Gratitude is riches. Complaint is poverty', 'Doris Day'),
        newQuote('This is a wonderful day. I have never seen this one before', 'Maya Angelou'),
        newQuote('The power of finding beauty in the humblest things makes home happy and life lovely', 'Louisa May Alcott'),
        newQuote('Gratitude is the fairest blossom which springs from the soul', 'Henry Ward Beecher'),
        newQuote('No duty is more urgent than giving thanks', 'James Allen'),
        newQuote('When I started counting my blessings, my whole life turned around', 'Willie Nelson'),
        newQuote('"Enough" is a feast', 'Buddhist Proverb'),
        newQuote('Thankfulness is the quickest path to joy', 'Jefferson Bethke'),
    ]
    const index = Math.ceil(Math.random() * quotes.length) - 1

    const { quote, author } = quotes[index]
    return <section className={styles.quote}>

        <h1>{quote} </h1>
        <section>
            <div className={styles.loadingDots}>
                <h2 className='subheader' > - {author} </h2>
                <div className={`${styles.dot} ${styles.d0}`}></div>
                <div className={`${styles.dot} ${styles.d1}`}></div>
                <div className={`${styles.dot} ${styles.d2}`}></div>
            </div>
        </section>

    </section>
}

const newQuote = (quote: string, author: string) => {
    return {
        quote, author
    }
}

export default PageLoading