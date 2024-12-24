import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { GetAllUsers } from '../../Networking/APIs';

const UserCards = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ADMIN');

  useEffect(() => {
    // Fetch data from the backend
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers();
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  // Segregate users by roles
  const segregatedUsers = {
    ADMIN: users.filter((user) => user.role === 'ADMIN'),
    DOCTOR: users.filter((user) => user.role === 'DOCTOR'),
    PATIENT: users.filter((user) => user.role === 'PATIENT'),
    RECEPTIONIST: users.filter((user) => user.role === 'RECEPTIONIST'),
  };

  return (
    <Box p={3}>
      {/* Role Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Role Tabs"
        sx={{ mb: 2 }}
      >
        {Object.keys(segregatedUsers).map((role) => (
          <Tab key={role} label={role} value={role} />
        ))}
      </Tabs>

      <Divider sx={{ mb: 3 }} />

      {/* Display Users in Active Tab */}
      <Box>
        <Grid container spacing={3}>
          {segregatedUsers[activeTab].length > 0 ? (
            segregatedUsers[activeTab].map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined" className="user-card">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {user.firstname + ' ' + user.lastname}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Role:</strong> {user.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No users found for this role.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserCards;
