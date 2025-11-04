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
  mobileOpen,
  drawer,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);

  // Menu handlers
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClick2 = (event) => setAnchorE2(event.currentTarget);
  const handleMenuClick3 = (event) => setAnchorE3(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const handleClose2 = () => setAnchorE2(null);
  const handleClose3 = () => setAnchorE3(null);

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
          <IconButton
    onClick={(event) => setProfileAnchor(event.currentTarget)}
    sx={{ p: 0, ml: 2 }}
  >
    <Avatar
      alt="User Profile"
    
      sx={{ width: 32, height: 32,backgroundColor:'#001F3F' }}
    />
  </IconButton>

          {/* Timesheets Menu */}
          {/* <Button color="inherit" onClick={handleMenuClick3}>
            Timesheets
          </Button>
          <Menu anchorEl={anchorE3} open={Boolean(anchorE3)} onClose={handleClose3}>
            <MenuItem onClick={handleClose3} component={Link} to="/timesheet/day-plan">
              Employee
            </MenuItem>
            <MenuItem onClick={handleClose3} component={Link} to="/timesheet/rl-timesheets">
              RL
            </MenuItem>
            <MenuItem onClick={handleClose3} component={Link} to="/timesheet/manager-timesheets">
              Manager
            </MenuItem>
          </Menu> */}

          {/* Tasks Menu */}
          {/* <Button color="inherit" onClick={handleMenuClick2}>
            Tasks
          </Button>
          <Menu anchorEl={anchorE2} open={Boolean(anchorE2)} onClose={handleClose2}>
            <MenuItem onClick={handleClose2} component={Link} to="/timesheet/tasks">
              Employee
            </MenuItem>
            <MenuItem onClick={handleClose2} component={Link} to="/timesheet/rl-tasks">
              RL
            </MenuItem>
            <MenuItem onClick={handleClose2} component={Link} to="/timesheet/manager">
              Manager
            </MenuItem>
          </Menu> */}

          {/* Config Menu */}
          {/* <Button color="inherit" onClick={handleMenuClick}>
            Configuration
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose} component={Link} to="/timesheet/user-registration">
              User Registration
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/timesheet/department">
              Department
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/timesheet/designation">
              Designation
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/timesheet/projects">
              Projects
            </MenuItem>
          </Menu> */}
        </Toolbar>
      </AppBar>

      {/* ---------- Sidebar ---------- */}
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
        
         <Button color="inherit" sx={{paddingTop:'16px'}} onClick={handleMenuClick3}>
          <IconButton edge="start" color="white" aria-label="menu">
            <FontAwesomeIcon icon={faFileCircleCheck} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Timesheets
          </Button>
          <Menu anchorEl={anchorE3} open={Boolean(anchorE3)} onClose={handleClose3}>
            <MenuItem onClick={handleClose3} component={Link} to="/timesheet/day-plan">
              Employee
            </MenuItem>
            <MenuItem onClick={handleClose3} component={Link} to="/timesheet/rl-timesheets">
              RL
            </MenuItem>
            <MenuItem onClick={handleClose3} component={Link} to="/timesheet/manager-timesheets">
              Manager
            </MenuItem>
          </Menu>
        <Button color="inherit" onClick={handleMenuClick2}>
           <IconButton edge="start"  aria-label="menu">
            <FontAwesomeIcon icon={faTasksAlt} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
           Tasks
          </Button>
          <Menu anchorEl={anchorE2} open={Boolean(anchorE2)} onClose={handleClose2}>
            <MenuItem onClick={handleClose2} component={Link} to="/timesheet/tasks">
              Employee
            </MenuItem>
            <MenuItem onClick={handleClose2} component={Link} to="/timesheet/rl-tasks">
              RL
            </MenuItem>
            <MenuItem onClick={handleClose2} component={Link} to="/timesheet/manager">
              Manager
            </MenuItem>
          </Menu>

          <Button color="inherit" component={Link} to="/timesheet/projects">
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faDiagramProject} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Projects
          </Button>

           <Button color="inherit" component={Link} to='/timesheet/user-registration'>
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faUsers} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Employee
          </Button>
        
         <Button color="inherit" onClick={handleMenuClick}>
           <IconButton edge="start" color="#FFFFFF" aria-label="menu">
            <FontAwesomeIcon icon={faCogs} size="medium"  style={{ color: "#FFFFFF" }} />
          </IconButton>
            Configuration
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose} component={Link} to="/timesheet/user-registration">
              User Registration
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/timesheet/department">
              Department
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/timesheet/designation">
              Designation
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/timesheet/projects">
              Projects
            </MenuItem>
          </Menu>
      </Drawer>

      {/* ---------- Main Content ---------- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '48px', // same as AppBar height
        }}
      >
        {/* Your main content here */}

        
      </Box>
    </Box>
  );
}

export default MainHeader;


// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Drawer,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAlarmClock } from '@fortawesome/free-solid-svg-icons';

// function MainHeader({container,mobileOpen,drawer,handleDrawerTransitionEnd,handleDrawerClose}) {
//   const drawerWidth = 240;
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [anchorE2, setAnchorE2] = useState(null);
//   const [anchorE3, setAnchorE3] = useState(null);

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClick2 = (event) => {
//     setAnchorE2(event.currentTarget);
//   };
//    const handleMenuClick3 = (event) => {
//     setAnchorE3(event.currentTarget);
//   };


//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//    const handleClose2 = () => {
//     setAnchorE2(null);
//   };
//   const handleClose3 = () => {
//     setAnchorE3(null);
//   };


//   return (
//     <AppBar position="static" color="#FFA500" sx={{ backgroundColor: '#FFA500' }}>
//       <Toolbar sx={{ minHeight: '48px !important' }}>
//         <IconButton edge="start" color="inherit" aria-label="menu" >
//           <FontAwesomeIcon icon={faAlarmClock} size="small" />
//         </IconButton>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Time Sheet
//         </Typography>
//         {/* <Button component={Link} to="/timesheet/home" color='white'>Home</Button> */}
//         {/* <Button component={Link} to="/timesheet/day-plan" color='white'>TIME SHEET</Button> */}
//         <Button color="inherit" onClick={handleMenuClick3}>
//           Timesheets
//         </Button>
//         <Menu
//           anchorEl={anchorE3}
//           open={Boolean(anchorE3)}
//           onClose={handleClose3}
//         >
//           <MenuItem onClick={handleClose3} component={Link} to="/timesheet/day-plan">
//             Employee
//           </MenuItem>
//           <MenuItem onClick={handleClose3} component={Link} to="/timesheet/rl-timesheets">
//             RL
//           </MenuItem>
//           <MenuItem onClick={handleClose3} component={Link} to="/timesheet/manager-timesheets">
//             Manager
//           </MenuItem>

// </Menu>
//          {/* <Button component={Link} to="/timesheet/tasks" color='white'>Tasks</Button> */}
// <Button color="inherit" onClick={handleMenuClick2}>
//           Tasks
//         </Button>
//         <Menu
//           anchorEl={anchorE2}
//           open={Boolean(anchorE2)}
//           onClose={handleClose2}
//         >
//           <MenuItem onClick={handleClose2} component={Link} to="/timesheet/tasks">
//             Employee
//           </MenuItem>
//           <MenuItem onClick={handleClose2} component={Link} to="/timesheet/rl-tasks">
//             RL
//           </MenuItem>
//           <MenuItem onClick={handleClose2} component={Link} to="/timesheet/manager">
//             Manager
//           </MenuItem>

// </Menu>
//         <Button color="inherit" onClick={handleMenuClick}>
//           Configuration
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleClose} component={Link} to="/timesheet/user-registration">
//             User Registration
//           </MenuItem>
//           <MenuItem onClick={handleClose} component={Link} to="/timesheet/department">
//             Department
//           </MenuItem>
//           <MenuItem onClick={handleClose} component={Link} to="/timesheet/designation">
//             Designation
//           </MenuItem>
//            <MenuItem onClick={handleClose} component={Link} to="/timesheet/projects">
//             Projects
//           </MenuItem>
//         </Menu>
//       </Toolbar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           slotProps={{
//             root: {
//               keepMounted: true, // Better open performance on mobile.
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//     </AppBar>
    
//   );
// }

// export default MainHeader;
