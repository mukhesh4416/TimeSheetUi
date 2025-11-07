import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './authentications/Login'
import Timesheet from './components/Timesheet'
import UserRegistration from './components/registrations/UserRegistration'
import Projects from './components/registrations/Projects'
import Designation from './components/registrations/Designation'
import Department from './components/registrations/Department'
import Dayplan from './components/Dayplan'
import ForgotPassword from './authentications/ForgotPassword'
import Tasks from './components/Tasks'
import ManagerTasks from './components/ManagerTasks'
import RLTasks from './components/RLTasks'
import TimesheetRL from './components/TimesheetRL'
import TimesheetManager from './components/TimesheetManager'
import WelcomePage from './components/WelcomePage'

function RouterConfig() {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} >
          <Route path="forgot" element={<ForgotPassword />} />
          </Route>
          <Route path="/timesheet" element={<Timesheet/>}>
          <Route index element={<WelcomePage />} />
            <Route path="day-plan" element={<Dayplan/>} />
            <Route path="tasks" element={<Tasks/>} />
            <Route path="department" element={<Department/>} />
            <Route path="designation" element={<Designation/>} />
            <Route path="projects" element={<Projects/>} />
            <Route path="user-registration" element={<UserRegistration/>} />
            <Route path = "manager" element ={<ManagerTasks/>}/>
             <Route path = "rl-tasks" element ={<RLTasks/>}/>
              <Route path = "rl-timesheets" element ={<TimesheetRL/>}/>
              <Route path = "manager-timesheets" element ={<TimesheetManager/>}/>
          </Route>
    </Routes>
  )
}

export default RouterConfig