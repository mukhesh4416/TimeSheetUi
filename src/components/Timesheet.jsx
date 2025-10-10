import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Timesheet() {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>
                {/* <div>
                    <Sidebar/>
                </div>
                <div>
                    <Outlet/>
                </div> */}
                <div className="row">
                    <Sidebar/>
                    <div className="col-md-10 p-4 bg-white "><Outlet/></div>
                </div>
            </main>
        </div>
    )
}

export default Timesheet