import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  MenuItem,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { addSlots, DeleteSlot, GetMySlots, UpdateSlot } from "../../Networking/APIs";
import "../Css/MySlots.css";

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      times.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
    }
  }
  return times;
};

const MySlots = () => {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: "",
    slotFrom: "",
    slotTo: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const resp = await GetMySlots();
        if (resp.ok) {
          setSlots(await resp.json());
        } else {
          throw new Error("Failed to fetch slots.");
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        setErrorMessage("Failed to load slots.");
        setShowSnackbar(true);
      }
    };
    fetchSlots();
  }, []);

  const groupSlotsByDate = (slots) => {
    return slots.reduce((acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    }, {});
  };

  const handleFieldChange = (field, value) => {
    setNewSlot((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveSlot = async () => {
    if (!newSlot.date || !newSlot.slotFrom || !newSlot.slotTo) {
      setErrorMessage("All fields are required.");
      setShowSnackbar(true);
      return;
    }
    if (newSlot.slotFrom >= newSlot.slotTo) {
      setErrorMessage("Slot From must be earlier than Slot To.");
      setShowSnackbar(true);
      return;
    }

    const formattedSlot = {
      ...newSlot,
      slotFrom: newSlot.slotFrom,
      slotTo: newSlot.slotTo,
    };

    if (editIndex === null) {
      try {
        const resp = await addSlots(formattedSlot);
        if (resp.ok) {
          const savedSlot = await resp.json();
          setSlots([...slots, { ...newSlot, slotId: savedSlot.slotId }]);
          setNewSlot({
            date: "",
            slotFrom: "",
            slotTo: "",
          });
        } else {
          throw new Error("Failed to save slot.");
        }
      } catch (error) {
        console.error("Error saving slot:", error);
        setErrorMessage("Failed to save slot.");
        setShowSnackbar(true);
      }
    } else {
      try {
        const slotToUpdate = slots[editIndex];
        const updatedSlot = { ...slotToUpdate, ...formattedSlot };
        const resp = await UpdateSlot(updatedSlot.slotId, updatedSlot);
        if (resp.ok) {
          const updatedSlots = [...slots];
          updatedSlots[editIndex] = updatedSlot;
          setSlots(updatedSlots);
          setEditIndex(null);
          setNewSlot({
            date: "",
            slotFrom: "",
            slotTo: "",
          });
        } else {
          throw new Error("Failed to update slot.");
        }
      } catch (error) {
        console.error("Error updating slot:", error);
        setErrorMessage("Failed to update slot.");
        setShowSnackbar(true);
      }
    }
  };

  const groupedSlots = groupSlotsByDate(slots);

  return (
    <Box className="slot-container">
      <Typography className="header">Appointment Slot Manager</Typography>

      {/* Form */}
      <Box className="slot-form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              value={newSlot.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Slot From"
              value={newSlot.slotFrom}
              onChange={(e) => handleFieldChange("slotFrom", e.target.value)}
              fullWidth
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Slot To"
              value={newSlot.slotTo}
              onChange={(e) => handleFieldChange("slotTo", e.target.value)}
              fullWidth
              disabled={!newSlot.slotFrom}
            >
              {timeOptions
                .filter((time) => time > newSlot.slotFrom)
                .map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSaveSlot}
              fullWidth
              className="save-button"
            >
              {editIndex !== null ? "Update Slot" : "Add Slot"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Slots */}
      <Box className="slot-content">
        {Object.entries(groupedSlots).map(([date, dateSlots]) => (
          <Box key={date} className="date-group">
            <Typography className="date-header">{date}</Typography>
            <Grid container spacing={2}>
              {dateSlots.map((slot, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card className="slot-card">
                    <CardContent>
                      <Typography variant="body1">
                        <strong>Slot:</strong> {slot.slotFrom} - {slot.slotTo}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MySlots;
