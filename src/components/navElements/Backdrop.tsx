import React from 'react'
import styles from './Backdrop.css'
import { BackdropProps } from '../../interfaces'

const backdrop = (props: BackdropProps): JSX.Element|null => (
    props.isVisible ? <div className={styles.Backdrop} onClick={props.clicked}></div> : null
)

export default backdrop
