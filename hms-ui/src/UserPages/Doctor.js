import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import './Css/Doctor.css';
import { PATHS } from '../Helpers/Paths';
import OrgStructure from './Subs/OrgStructure';
import DoctorInfo from './Subs/DoctorInfo';
import MySlots from './Subs/MySlots';

const menuItems = [
  { text: 'Update My Info', icon: <DashboardIcon />, content: <DoctorInfo /> },
  { text: 'Appointments', icon: <PeopleIcon />, content: <h3>Appoitments</h3> },
  { text: 'My Slots', icon: <EventIcon />, content:<MySlots /> },
  { text: 'Organisation', icon: <LocalHospitalIcon />, content: <OrgStructure /> },
];

export const Doctor = () => {
  const [activeContent, setActiveContent] = useState(menuItems[0].content);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate(PATHS.HOME);
  };

  return (
    <Box className="admin-layout">
      {/* Top Bar */}
      <Box className="top-bar">
        <AppBar position="static" className="admin-appbar">
          <Toolbar>
            {/* Center Title */}
            <Typography variant="h4" className="app-title">
              Hospital Management System - Doctor
            </Typography>
            {/* Logout Button */}
            <Button
              variant="contained"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Bottom Row */}
      <Box className="bottom-row">
        {/* Sidebar */}
        <Box className="sidebar">
          {/* User Welcome */}
          <Box className="sidebar-header">
            <Typography variant="body1" className="user-name">
              Welcome, {sessionStorage.getItem('user')}
            </Typography>
          </Box>
          {/* Menu Items */}
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                className={`menu-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveContent(item.content);
                  setActiveIndex(index);
                }}
              >
                <ListItemIcon className="menu-icon">{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Content Area */}
        <Box className="content-area">
          <Box className="content-container">{activeContent}</Box>
        </Box>
      </Box>
    </Box>
  );
};
