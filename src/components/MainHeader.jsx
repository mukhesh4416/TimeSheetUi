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
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlarmClock } from '@fortawesome/free-solid-svg-icons';

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
        <IconButton edge="start" color="inherit" aria-label="menu" >
          <FontAwesomeIcon icon={faAlarmClock} size="small" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Time Sheet
        </Typography>
        <Button component={Link} to="/timesheet/home" color='white'>Home</Button>
        <Button component={Link} to="/timesheet/day-plan" color='white'>Day Plan</Button>
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
