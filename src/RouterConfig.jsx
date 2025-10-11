import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './authentications/Login'
import Timesheet from './components/Timesheet'
import UserRegistration from './components/registrations/UserRegistration'
import Projects from './components/registrations/Projects'
import Designation from './components/registrations/Designation'
import Department from './components/registrations/Department'

function RouterConfig() {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timesheet" element={<Timesheet/>}>
            <Route path="department" element={<Department/>} />
            <Route path="designation" element={<Designation/>} />
            <Route path="projects" element={<Projects/>} />
            <Route path="user-registration" element={<UserRegistration/>} />
          </Route>
    </Routes>
  )
}

export default RouterConfig