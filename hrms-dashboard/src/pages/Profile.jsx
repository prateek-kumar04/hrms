import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { useAuth } from "../AuthContext";

const initialProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "+1 (555) 123-4567",
  department: "Human Resources",
  role: "HR Manager",
  status: "active",
  dob: "1990-05-15",
};

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    ...initialProfile,
    firstName:
      user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "User",
    lastName: user?.displayName?.split(" ")[1] || "",
    email: user?.email || "user@company.com",
  });
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEdit(true);
  const handleCancel = () => {
    setProfile({
      ...initialProfile,
      firstName: user?.displayName?.split(" ")[0] || "User",
      lastName: user?.displayName?.split(" ")[1] || "",
      email: user?.email || "user@company.com",
    });
    setEdit(false);
  };
  const handleSave = () => setEdit(false);

  const displayName = user?.displayName || user?.email || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={11} lg={10}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
              elevation={3}
            >
              <Avatar
                sx={{ width: 80, height: 80, mb: 2, bgcolor: "primary.main" }}
              >
                {initials}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {displayName?.split("@")[0]}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                {profile.role}
              </Typography>
              <Chip
                label={profile.status}
                color={profile.status === "active" ? "success" : "default"}
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                {profile.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.department}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 2 }} elevation={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    name="department"
                    value={profile.department}
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Role"
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Birth"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                    fullWidth
                    disabled={!edit}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                {edit ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={handleEdit}>
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
