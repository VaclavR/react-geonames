import React from 'react'
import DrawerToggle from './DrawerToggle'
import NavItems from './NavItems'
import styles from './Topbar.css'
import { TopbarProps } from '../../interfaces'

const Topbar = (props: TopbarProps): JSX.Element => {
    return (
        <header className={styles.topbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <nav className={styles.DesktopOnly}>
                <NavItems />
            </nav>
        </header>
    )
}

export default Topbar
