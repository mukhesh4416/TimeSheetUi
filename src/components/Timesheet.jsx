import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from './MainHeader'
import LandingPage from './LandingPage'

function Timesheet() {
    return (
        <main>
            <section>
                <header>
                    
                    <LandingPage />
                </header>
                <div>
                    
                    <Outlet />
                </div>
                <footer>
                    
                </footer>
            </section>
        </main>
    )
}

export default Timesheet