import PageLoading from '../components/page-loading'
import styles from './page.module.css'

export function SocialLoading() {
    return <section className={`${styles.page} ${styles.center}`}>
        <PageLoading />
    </section>
}

export default SocialLoading
