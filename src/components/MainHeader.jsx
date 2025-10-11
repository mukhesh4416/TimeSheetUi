import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function MainHeader() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ minHeight: '48px !important' }}>
        {/* Left icon (e.g., menu button for mobile) */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>

        {/* Title / Branding */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Time Sheet
        </Typography>

        {/* Right-side navigation */}
        <Link className="text-light" to="/timesheet/home">
          <Button color="inherit">Home</Button>
        </Link>
        
        <Button color="inherit" onClick={handleMenuClick}>
          Registration
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
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
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
