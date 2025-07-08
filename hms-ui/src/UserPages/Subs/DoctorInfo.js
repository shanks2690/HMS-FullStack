import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Switch, FormControlLabel } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { GetDocInfo, SaveDocInfo } from "../../Networking/APIs";
import { BRANCHES, DEPARTMENTS } from "../../Helpers/Constants";
import "../Css/DoctorInfo.css"; // Import the CSS file

const DoctorInfo = () => {
  const [doctorInfo, setDoctorInfo] = useState({});

  useEffect(() => {
    const fetchMyInfo = async () => {
      const data = await GetDocInfo();
      let info = await data.json();
      info.branchCode = BRANCHES[info.branchCode];
      setDoctorInfo(info);
    };
    fetchMyInfo();
  }, []);

  const handleFieldChange = (field, value) => {
    console.log("Now ", field, value);
    
    setDoctorInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    console.log("Updated Doctor Info:", doctorInfo);
    const payload = { ...doctorInfo };
    payload.branchCode = Object.keys(BRANCHES).find(
      (key) => BRANCHES[key] === payload.branchCode
    );
    payload.department = payload.department.toUpperCase();
    await SaveDocInfo(payload);
    alert("Doctor information saved successfully!");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="doctor-info-container">
        <Typography variant="h5" className="doctor-info-title">
          Update Doctor Information
        </Typography>

        {Object.entries(doctorInfo).map(([key, value]) => {
          if (key === "docId") {
            return null; // Exclude docId from UI
          } else if (key === "branchCode") {
            return (
              <Box key={key} className="doctor-info-field">
                <Typography className="doctor-info-label">Branch Code:</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={value || ""}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                >
                  {Object.keys(BRANCHES).map((branchKey) => (
                    <MenuItem key={BRANCHES[branchKey]} value={BRANCHES[branchKey]}>
                      {BRANCHES[branchKey]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            );
          } else if (key === "department") {
            return (
              <Box key={key} className="doctor-info-field">
                <Typography className="doctor-info-label">Department:</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={value || ""}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                >
                  {DEPARTMENTS.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            );
          } else if (key === "availability") {
            return (
              <Box key={key} className="doctor-info-field">
                <Typography className="doctor-info-label">Availability:</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={value || false}
                      onChange={(e) => handleFieldChange(key, e.target.checked)}
                      color="primary"
                    />
                  }
                  label={value ? "Available" : "Unavailable"}
                />
              </Box>
            );
          } else if (key === "dateOfReg" || key === "dateOfSpl") {
            const label = key === "dateOfReg" ? "Date of Registration" : "Date of Specialization";
            return (
              <Box key={key} className="doctor-info-field">
                <Typography className="doctor-info-label">{label}:</Typography>
                <DatePicker
                  value={value ? dayjs(value) : null}
                  onChange={(newValue) =>
                    handleFieldChange(key, newValue ? newValue.toISOString() : null)
                  }
                  renderInput={(params) => (
                    <TextField {...params} size="small" fullWidth />
                  )}
                />
              </Box>
            );
          } else {
            return (
              <Box key={key} className="doctor-info-field">
                <Typography className="doctor-info-label">
                  {key.replace(/([A-Z])/g, " $1")}:
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={value || ""}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                  placeholder={`Enter ${key}`}
                />
              </Box>
            );
          }
        })}

        <Box className="doctor-info-save">
          <Button variant="contained" onClick={handleSave} className="doctor-info-save-button">
            Save
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DoctorInfo;
