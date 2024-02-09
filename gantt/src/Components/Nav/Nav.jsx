import React from 'react'
import styles from './nav.module.css'

function Nav() {
  return (
    <nav className={styles.nav}>
        <ul className={styles.ul}>
            <li className={styles.li}><a href="/">Home</a></li>
            <li className={styles.li}><a href="/">Profile</a></li>
            <li className={styles.li}><a href="/">Exit</a></li>
        </ul>
    </nav>
  )
}

export default Nav