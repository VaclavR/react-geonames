import React from 'react'
import styles from './NavItems.css'

let defaultTheme = true

function changeTheme() {
    if (defaultTheme) {
        document.documentElement.style.setProperty('--primary-dark-color', 'black')
        document.documentElement.style.setProperty('--secondary-dark-color', 'grey')
        document.documentElement.style.setProperty('--terciary-dark-color', '#292929')
        document.documentElement.style.setProperty('--primary-light-color', 'white')
        document.documentElement.style.setProperty('--secondary-light-color', 'lightgrey')
        document.documentElement.style.setProperty('--terciary-light-color', 'white')
    } else {
        document.documentElement.style.setProperty('--primary-dark-color', 'white')
        document.documentElement.style.setProperty('--secondary-dark-color', 'lightgrey')
        document.documentElement.style.setProperty('--terciary-dark-color', '#292929')
        document.documentElement.style.setProperty('--primary-light-color', 'black')
        document.documentElement.style.setProperty('--secondary-light-color', '#292929')
        document.documentElement.style.setProperty('--terciary-light-color', 'white')
    }
    defaultTheme = !defaultTheme
}

changeTheme()

const NavItems = (): JSX.Element => {
    return (
        <ul className={styles.navItems}>
            <li className={styles.active}>Countries</li>
            <li>Settings</li>
            <li onClick={changeTheme}>Theme</li>
        </ul>
    )
}

export default NavItems
