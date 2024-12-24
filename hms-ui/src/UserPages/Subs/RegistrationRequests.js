import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import {  ApproveRequest, RejectRequest } from '../../Networking/Calls';
import { GetRegistrationRequests, RegAllRequests } from '../../Networking/APIs';


const RegistrationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch registration requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await GetRegistrationRequests() ;
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching registration requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (email) => {
    try {
      const response = await ApproveRequest(email);
      if (response.ok) {
        setRequests((prev) => prev.filter((req) => req.email !== email));
      } else {
        console.error('Failed to approve request');
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (email) => {
    try {
      const response = await RejectRequest(email);
      if (response.ok) {
        setRequests((prev) => prev.filter((req) => req.email !== email));
      } else {
        console.error('Failed to reject request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleApproveAll = async () => {
    try {
      const response = await RegAllRequests();
      if (response.ok) {
        setRequests([]); // Clear all requests from the UI after successful approval
      } else {
        console.error('Failed to approve all requests');
      }
    } catch (error) {
      console.error('Error approving all requests:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" className="registration-title">
          Registration Requests
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="approve-all-btn"
          onClick={handleApproveAll}
          disabled={requests.length === 0}
        >
          Approve All
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table className="registration-table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.firstname}</TableCell>
                <TableCell>{request.lastname}</TableCell>
                <TableCell>{request.role}</TableCell>
                <TableCell align="center" className="action-buttons">
                  <Button
                    variant="contained"
                    className="approve-btn"
                    size="small"
                    onClick={() => handleApprove(request.email)}
                  >
                    Approve
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="contained"
                    className="reject-btn"
                    size="small"
                    onClick={() => handleReject(request.email)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RegistrationRequests;
