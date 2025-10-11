import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from './MainHeader'

function Timesheet() {
    return (
        <main>
            <section>
                <header>
                    <MainHeader />
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