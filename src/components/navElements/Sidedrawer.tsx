import React from 'react'
import NavItems from './NavItems'
import Backdrop from './Backdrop'
import styles from './SideDrawer.css'
import { SideDrawerProps } from '../../interfaces'

const Sidedrawer = (props: SideDrawerProps): JSX.Element => {
    return (
        <React.Fragment>
            <Backdrop isVisible={props.isOpen} clicked={props.closedHandler} />
            <div
                className={[styles.SideDrawer, (props.isOpen ? styles.Open : styles.Close)].join(' ')}
                onClick={props.closedHandler}>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Sidedrawer
