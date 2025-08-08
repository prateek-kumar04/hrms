import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";

const summary = [
  {
    label: "Total Employees",
    value: 5,
    icon: <PeopleIcon color="primary" />,
    sub: "4 active",
    trend: "+2% from last month",
  },
  {
    label: "Pending Leaves",
    value: 1,
    icon: <CalendarMonthIcon color="warning" />,
    sub: "Awaiting approval",
    trend: "3 new requests",
  },
  {
    label: "Approved Leaves",
    value: 2,
    icon: <CheckCircleIcon color="success" />,
    sub: "This month",
    trend: "+8% from last month",
  },
  {
    label: "Departments",
    value: 5,
    icon: <ApartmentIcon color="secondary" />,
    sub: "Active departments",
    trend: "Engineering leading",
  },
];

const recentLeaves = [
  {
    name: "Jane Smith",
    type: "vacation",
    period: "Sep 1 - Sep 5",
    status: "pending",
  },
];

const birthdays = [
  { name: "Jane Smith", role: "Software Engineer", date: "Sep 5" },
];

export default function DashboardHome() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Welcome back, John!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Here's what's happening with your team today.
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {summary.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
              }}
              elevation={3}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {card.icon}
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {card.value}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card.sub}
              </Typography>
              <Typography variant="caption" color="success.main">
                {card.trend}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }} elevation={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Recent Leave Requests
            </Typography>
            <List>
              {recentLeaves.map((req, i) => (
                <ListItem
                  key={i}
                  secondaryAction={
                    <Chip
                      sx={{ marginBottom: "20px" }}
                      label={req.status}
                      color={req.status === "pending" ? "warning" : "success"}
                      size="small"
                    />
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      {req.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={req.name}
                    secondary={`${req.type} • ${req.period}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }} elevation={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Upcoming Birthdays
            </Typography>
            <List>
              {birthdays.map((b, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      {b.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={b.name}
                    secondary={`${b.role} • ${b.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
