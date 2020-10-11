import React from 'react'
import styles from './DrawerToggle.css'
import { DrawerToggleProps } from '../../interfaces'

const drawerToggle = (props: DrawerToggleProps): JSX.Element => (
    <div
        className={styles.DrawerToggle}
        onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawerToggle
