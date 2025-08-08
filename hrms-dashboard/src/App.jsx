import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./pages//DashboardLayout";
import EmployeeDirectory from "./pages//EmployeeDirectory";
import LeaveRequests from "./pages//LeaveRequests";
import Profile from "./pages//Profile";
import DashboardHome from "./pages//DashboardHome";
import NotFound from "./pages//NotFound";

function App() {
  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="employees" element={<EmployeeDirectory />} />
            <Route path="leaves" element={<LeaveRequests />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reports" element={<div>Reports Placeholder</div>} />
            <Route path="settings" element={<div>Settings Placeholder</div>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
