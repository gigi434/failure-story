// import styles from './styles/Home.module.css'
import styles from './index.module.scss'
import Layout from 'components/templates/Layout'

export default function Home() {
  return (
    <Layout title="hello">
      <p className={styles.p}>Welcome</p>
    </Layout>
  )
}
