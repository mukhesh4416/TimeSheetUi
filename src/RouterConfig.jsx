import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './authentications/Login'
import Timesheet from './components/Timesheet'
import Department from './components/Department'

function RouterConfig() {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timesheet" element={<Timesheet/>}>
            <Route path="department" element={<Department/>} />
          </Route>
    </Routes>
  )
}

export default RouterConfig