import React, { useState } from 'react'
import SideDrawer from './components/navElements/Sidedrawer'
import Topbar from './components/navElements/Topbar'
import CountriesControl from './containers/CountriesControl'
import styles from './App.css'

const App = (): JSX.Element => {
    const [isSidedrawerVisible, setSidedrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setSidedrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setSidedrawer(!isSidedrawerVisible)
    }
    return (
        <div className={styles.app}>
            <div className={styles.content}>
                <Topbar
                    isOpen={isSidedrawerVisible}
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isOpen={isSidedrawerVisible}
                    closedHandler={sideDrawerClosedHandler} />
                <CountriesControl />
            </div>
        </div>
    )
}

export default App
