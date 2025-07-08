import React, { useState, useEffect } from "react";
import { Organisation } from "../../Networking/APIs";
import { BRANCHES } from "../../Helpers/Constants";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import "../Css/OrgStructure.css";

const OrgStructure = () => {
  const [data, setData] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Organisation();
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlaceChange = (event, newValue) => {
    setSelectedPlace(newValue);
    setSelectedDepartment("");
  };

  const handleDepartmentChange = (event, newValue) => {
    setSelectedDepartment(newValue);
  };

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
        <Typography className="loading-text">Loading data, please wait...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <Alert severity="info">No data available at the moment.</Alert>;
  }

  const places = Object.keys(data);
  const departments = selectedPlace ? Object.keys(data[selectedPlace]) : [];

  return (
    <Box className="org-structure-container">
      <Typography variant="h4" className="header">
        Doctor Information Portal
      </Typography>

      {/* Place Selector */}
      <Box className="tab-container">
        <Typography variant="h6" className="tab-title">
          Select Place
        </Typography>
        <Tabs
          value={selectedPlace}
          onChange={handlePlaceChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          className="tabs"
        >
          {places.map((place) => (
            <Tab key={place} label={BRANCHES[place]} value={place} />
          ))}
        </Tabs>
      </Box>

      {/* Department Selector */}
      {selectedPlace && (
        <Box className="tab-container">
          <Typography variant="h6" className="tab-title">
            Select Department
          </Typography>
          <Tabs
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            className="tabs"
          >
            {departments.map((department) => (
              <Tab key={department} label={department} value={department} />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Doctor Cards */}
      {selectedPlace && selectedDepartment && (
        <Box className="doctor-cards-container">
          <Typography variant="h6" className="sub-header">
            Doctors in <span>{BRANCHES[selectedPlace]}</span>,{" "}
            <span>{selectedDepartment}</span>
          </Typography>
          <Grid container spacing={3}>
            {data[selectedPlace][selectedDepartment].map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor.docId}>
                <Card className="doctor-card">
                  <CardHeader
                    title={`${doctor.firstname} ${doctor.lastname}`}
                    subheader={doctor.email}
                  />
                  <CardContent>
                    <Typography variant="body2">
                      <strong>Registration No:</strong> {doctor.regNo || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Branch Code:</strong>{" "}
                      {BRANCHES[doctor.branchCode] || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Qualification:</strong>{" "}
                      {doctor.qualification || "N/A"}
                    </Typography>
                    <Chip
                      label={doctor.availability ? "Available" : "Unavailable"}
                      color={doctor.availability ? "success" : "error"}
                      className="availability-chip"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default OrgStructure;
