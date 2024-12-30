import Link from 'next/link'
import styles from './Footer.module.css'

interface FooterProps {
  navItems: {
    title: string
    url: string
    items?: { title: string; url: string }[]
  }[]
}

export default function Footer({ navItems }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <Link href="/" className={styles.footer__logo}>
            <img src="/logo-icon.svg" alt="logo" className={styles['footer__logo-image']} />
            <div className={styles['footer__logo-text']}>Coursfind</div>
          </Link>
          <div className={styles.footer__links}>
            {navItems.map((column) => (
              <div key={column.title} className={styles.footer__column}>
                <h3 className={styles['footer__column-title']}>{column.title}</h3>
                <ul className={styles['footer__column-list']}>
                  {column.items?.map((link) => (
                    <li key={link.title}>
                      <Link href={link.url} className={styles.footer__link}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.footer__bottom}>
            <Link href="/terms" className={styles['footer__bottom-link']}>
              Условия предоставления услуг
            </Link>
            <Link href="/privacy" className={styles['footer__bottom-link']}>
              Политика конфиденциальности
            </Link>
            <Link href="/cookies" className={styles['footer__bottom-link']}>
              Cookies-файлы
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

