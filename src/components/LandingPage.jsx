import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Toolbar,
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock, faCogs, faDiagramProject, faFileCircleCheck, faProjectDiagram, faTasksAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;

function LandingPage({
  container,

}) {

    const loginData = JSON.parse(sessionStorage.getItem("userData"));
    console.log(loginData.role)
   useEffect(() =>{


if(loginData.role === "Employee"){

    setEmployee(true);
    setManager(false);
    setRL(false);

}else if(loginData.role === "Manager"){
    setManager(true);
    setEmployee(false);
    setRL(false);

    
} else if(loginData.role === "Reporting Lead"){
    setRL(true);
    setManager(false);
    setEmployee(false)
}

   },[])


  const [employee,setEmployee] = useState(true);
   const [rl,setRL] = useState(false);
    const [manager,setManager] = useState(false);

  const [anchorE,setAnchorE] =useState(null);
  
  // Menu handlers
  const handleClick  = (event) => setAnchorE(event.currentTarget);
  
  return (
    <Box sx={{ display: 'flex' }}>
      
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          backgroundColor: '#FFFFFF',
        }}
      >
        <Toolbar sx={{ minHeight: '68px !important' }}>
          <IconButton edge="start" color="#001F3F" aria-label="menu">
            <FontAwesomeIcon icon={faAlarmClock} size="medium" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:'#001F3F' ,fontWeight: 'bold', }}>
            Time Sheet
          </Typography>
          <Button onClick={handleClick}>{loginData.profileName}</Button>
          
          <IconButton
    onClick={(event) => setProfileAnchor(event.currentTarget)}
    sx={{ p: 0, ml: 2 }}
  >
    <Avatar
      alt="User Profile"
    
      sx={{ width: 32, height: 32,backgroundColor:'#001F3F' }}
    />
  </IconButton>


        </Toolbar>
      </AppBar>

      <Drawer
        container={container}
        variant="permanent"
        backgroundColor='#001F3F'
        

       sx={{
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: drawerWidth,
      boxSizing: 'border-box',
      top: '68px', 
      backgroundColor: '#001F3F',
      color: '#fff',  
      alignItems:'flex-start' ,
      paddingLeft:'20px'            
    },
  }}
      >

        {manager && <>
      <Button color="inherit" component={Link} to="/timesheet/projects">
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faDiagramProject} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Projects
          </Button>  

          <Button color="inherit" component={Link} to="/timesheet/manager">
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faTasksAlt} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Tasks
          </Button>  

          <Button color="inherit" component={Link} to="/timesheet/manager-timesheets">
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faFileCircleCheck} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Timesheets
          </Button> 
        </>}


        {rl && <>
      <Button color="inherit" component={Link} to="/timesheet/rl-tasks">
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faTasksAlt} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Tasks
          </Button>  

          <Button color="inherit" component={Link} to="/timesheet/rl-timesheets">
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faFileCircleCheck} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Timesheets
          </Button> 
        </>}


        
        {employee && <>
      <Button color="inherit" component={Link} to="/timesheet/tasks">
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faTasksAlt} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Tasks
          </Button>  

          <Button color="inherit" component={Link} to="/timesheet/day-plan">
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faFileCircleCheck} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Timesheets
          </Button> 
        </>}
      </Drawer>
      
    </Box>
    
  );
}

export default LandingPage;


