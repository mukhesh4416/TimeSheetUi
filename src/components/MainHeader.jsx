import React, { useState } from 'react';
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

function MainHeader({
  container,

}) {

  const [employee,setEmployee] = useState(false);
   const [rl,setRL] = useState(false);
    const [manager,setManager] = useState(false);

  const [anchorE,setAnchorE] =useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);

  // Menu handlers
  const handleClick  = (event) => setAnchorE(event.currentTarget);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClick2 = (event) => setAnchorE2(event.currentTarget);
  const handleMenuClick3 = (event) => setAnchorE3(event.currentTarget);

  const handleClose1 = () => setAnchorE(null);
  const handleClose = () => setAnchorEl(null);
  const handleClose2 = () => setAnchorE2(null);
  const handleClose3 = () => setAnchorE3(null);


  const handleRL = () => {

    setEmployee(false);
    setManager(false);
    setRL(true);
  }

   const handleManager = () => {

    setEmployee(false);
    setManager(true);
    setRL(false);
  }

   const handleEmployee = () => {
   setManager(false);
    setRL(false);
    setEmployee(true);
 
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* ---------- Header ---------- */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, // ensures header is above sidebar
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
          <Button onClick={handleClick}>Profile</Button>
           <Menu anchorEl={anchorE} open={Boolean(anchorE)} onClose={handleClose1}>
          <MenuItem onClick={handleEmployee} >Employee</MenuItem>
          <MenuItem onClick= {handleRL}>RL</MenuItem>
          <MenuItem onClick={handleManager}>Manager</MenuItem>
          </Menu>
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
      top: '68px', // same as AppBar height
      backgroundColor: '#001F3F', // ✅ navy blue color
      color: '#fff',  
      alignItems:'flex-start' ,
      paddingLeft:'20px'            // ✅ white text for contrast
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

export default MainHeader;


