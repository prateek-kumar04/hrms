import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const statusColors = {
  pending: "warning",
  approved: "success",
  rejected: "error",
};

const emptyLeave = {
  id: "",
  employee: "",
  role: "",
  type: "vacation",
  period: "",
  days: "",
  reason: "",
  status: "pending",
};

function validateLeave(lr) {
  const errors = {};
  if (!lr.employee) errors.employee = "Employee is required";
  if (!lr.role) errors.role = "Role is required";
  if (!lr.period) errors.period = "Period is required";
  if (!lr.days) errors.days = "Days is required";
  else if (isNaN(Number(lr.days)) || Number(lr.days) <= 0)
    errors.days = "Days must be a positive number";
  if (!lr.reason) errors.reason = "Reason is required";
  return errors;
}

function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [status, setStatus] = useState("All");
  const [filtered, setFiltered] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(emptyLeave);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("/leaves.json")
      .then((res) => res.json())
      .then((data) => setLeaves(data));
  }, []);

  useEffect(() => {
    let data = leaves;
    if (status !== "All") {
      data = data.filter((l) => l.status === status);
    }
    setFiltered(data);
  }, [status, leaves]);

  const statuses = ["All", "pending", "approved", "rejected"];

  const handleDialogOpen = (leave = emptyLeave) => {
    setEditMode(!!leave.id);
    setCurrent(
      leave.id
        ? { ...leave }
        : { ...emptyLeave, id: `LR${Math.floor(Math.random() * 10000)}` }
    );
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleChange = (e) =>
    setCurrent({ ...current, [e.target.name]: e.target.value });
  const handleSave = () => {
    const errs = validateLeave(current);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (editMode) {
      setLeaves((ls) => ls.map((l) => (l.id === current.id ? current : l)));
    } else {
      setLeaves((ls) => [...ls, current]);
    }
    setDialogOpen(false);
    setErrors({});
  };
  const handleDelete = (id) => {
    setLeaves((ls) => ls.filter((l) => l.id !== id));
    setDeleteDialog(false);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={11} lg={10}>
        <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Leave Requests
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleDialogOpen()}
            >
              New Request
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 2 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Period</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((lr) => (
                  <TableRow key={lr.id} hover>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: "primary.main",
                          }}
                        >
                          {lr.employee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={600}>
                            {lr.employee}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lr.role}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={lr.type}
                        color={lr.type === "vacation" ? "info" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{lr.period}</TableCell>
                    <TableCell>{lr.days}</TableCell>
                    <TableCell>{lr.reason}</TableCell>
                    <TableCell>
                      <Chip
                        label={lr.status}
                        color={statusColors[lr.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDialogOpen(lr)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setToDelete(lr.id);
                          setDeleteDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* Add/Edit Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editMode ? "Edit Leave Request" : "New Leave Request"}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Employee"
              name="employee"
              value={current.employee}
              onChange={handleChange}
              fullWidth
              error={!!errors.employee}
              helperText={errors.employee}
            />
            <TextField
              label="Role"
              name="role"
              value={current.role}
              onChange={handleChange}
              fullWidth
              error={!!errors.role}
              helperText={errors.role}
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={current.type}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="vacation">Vacation</MenuItem>
                <MenuItem value="sick">Sick</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Period"
              name="period"
              value={current.period}
              onChange={handleChange}
              fullWidth
              error={!!errors.period}
              helperText={errors.period}
            />
            <TextField
              label="Days"
              name="days"
              value={current.days}
              onChange={handleChange}
              fullWidth
              type="number"
              error={!!errors.days}
              helperText={errors.days}
            />
            <TextField
              label="Reason"
              name="reason"
              value={current.reason}
              onChange={handleChange}
              fullWidth
              error={!!errors.reason}
              helperText={errors.reason}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={current.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>Delete Leave Request</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this leave request?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => handleDelete(toDelete)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default LeaveRequests;
