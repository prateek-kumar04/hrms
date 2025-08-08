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
  TextField,
  InputAdornment,
  Chip,
  MenuItem,
  Select,
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const statusColors = {
  active: "success",
  inactive: "default",
};

const emptyEmployee = {
  id: "",
  name: "",
  email: "",
  department: "",
  role: "",
  status: "active",
};

function validateEmployee(emp) {
  const errors = {};
  if (!emp.name) errors.name = "Name is required";
  if (!emp.email) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(emp.email)) errors.email = "Invalid email";
  if (!emp.department) errors.department = "Department is required";
  if (!emp.role) errors.role = "Role is required";
  return errors;
}

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [filtered, setFiltered] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(emptyEmployee);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("/employees.json")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  useEffect(() => {
    let data = employees;
    if (search) {
      data = data.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.email.toLowerCase().includes(search.toLowerCase()) ||
          e.role.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (department !== "All") {
      data = data.filter((e) => e.department === department);
    }
    setFiltered(data);
  }, [search, department, employees]);

  const departments = [
    "All",
    ...Array.from(new Set(employees.map((e) => e.department))),
  ];

  const handleDialogOpen = (emp = emptyEmployee) => {
    setEditMode(!!emp.id);
    setCurrent(
      emp.id
        ? { ...emp }
        : { ...emptyEmployee, id: `EMP${Math.floor(Math.random() * 10000)}` }
    );
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleChange = (e) =>
    setCurrent({ ...current, [e.target.name]: e.target.value });
  const handleSave = () => {
    const errs = validateEmployee(current);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (editMode) {
      setEmployees((emps) =>
        emps.map((e) => (e.id === current.id ? current : e))
      );
    } else {
      setEmployees((emps) => [...emps, current]);
    }
    setDialogOpen(false);
    setErrors({});
  };
  const handleDelete = (id) => {
    setEmployees((emps) => emps.filter((e) => e.id !== id));
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
              Employee Directory
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleDialogOpen()}
            >
              Add Employee
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <TextField
              variant="outlined"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300, maxWidth: "100%" }}
            />
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((dep) => (
                  <MenuItem key={dep} value={dep}>
                    {dep}
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
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((emp) => (
                  <TableRow key={emp.id} hover>
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
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                        <Typography fontWeight={600}>{emp.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={emp.status}
                        color={statusColors[emp.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDialogOpen(emp)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setToDelete(emp.id);
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
            {editMode ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Name"
              name="name"
              value={current.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              value={current.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Department"
              name="department"
              value={current.department}
              onChange={handleChange}
              fullWidth
              error={!!errors.department}
              helperText={errors.department}
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
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={current.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
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
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this employee?
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

export default EmployeeDirectory;
