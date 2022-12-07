import Head from 'next/head'
import Image from 'next/image'
import { ReactNode } from 'react'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: ReactNode
  title: string
}

const Layout = (props: LayoutProps) => {
  const { children, title } = props
  return (
    <div className={styles['layout']}>
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className={styles['layout-main']}>{children}</main>
      <footer className={styles['layout-footer']}>
        <a
          className={styles['layout-footer-item']}
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Layout
