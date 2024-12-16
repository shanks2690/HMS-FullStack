import React, {useState} from 'react';
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
import './Css/Admin.css';
import { PATHS } from '../Helpers/Paths';
import UserCards from './Subs/UserCards';
import RegistrationRequests from './Subs/RegistrationRequests';
import RegisterUser from './Subs/RegisterUser';
import OrgStructure from './Subs/OrgStructure';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, content: <h3>Dashboard Content</h3> },
  { text: 'Registration Requests', icon: <PeopleIcon />, content: <RegistrationRequests /> },
  { text: 'Organisation', icon: <LocalHospitalIcon />, content: <OrgStructure /> },
  { text: 'Users', icon: <EventIcon />, content: <UserCards /> },
  { text: 'Register User', icon: <PeopleIcon />, content: <RegisterUser /> }, // New page
];

export const Admin = () => {
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
            Hospital Management System - ADMIN
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
      {/* Sidebar (Left Column) */}
      <Box className="sidebar">
        {/* User Name at Top */}
        <Box className="sidebar-header">
          <Typography variant="body1" className="dummy-name">
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
  
      {/* Content Area (Right Column) */}
      <Box className="content-area">
        <Box className="content-container">{activeContent}</Box>
      </Box>
    </Box>
  </Box>
  
  );
};
