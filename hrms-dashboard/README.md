# HRMS Dashboard

A modern, responsive Human Resources Management System (HRMS) dashboard built with React, Material-UI, and Firebase Authentication.

## 🚀 Features

### Authentication & Security

- **Firebase Authentication** with email/password login
- **Protected Routes** - automatic redirect to login for unauthenticated users
- **Dynamic User Display** - shows logged-in user's name/email in header
- **Logout Functionality** with automatic redirect to login page

### Dashboard Overview

- **Summary Cards** - Total Employees, Pending Leaves, Approved Leaves, Departments
- **Recent Leave Requests** - Quick overview of pending approvals
- **Upcoming Birthdays** - Team member celebrations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Employee Management

- **Employee Directory** with search and filter functionality
- **CRUD Operations** - Create, Read, Update, Delete employees
- **Department Filtering** - Filter employees by department
- **Status Management** - Active/Inactive employee status
- **Avatar Display** - Visual representation with initials

### Leave Management

- **Leave Requests** with comprehensive filtering
- **CRUD Operations** - Full management of leave requests
- **Status Tracking** - Pending, Approved, Rejected statuses
- **Type Classification** - Vacation, Sick leave types
- **Date Range Support** - Period and duration tracking

### User Profile

- **Dynamic Profile Display** - Shows actual logged-in user information
- **Editable Information** - Update personal details (local state)
- **Avatar Management** - Automatic initials generation
- **Role & Department** - User role and department display

### UI/UX Features

- **Dark Mode Toggle** - Switch between light and dark themes
- **Material-UI Design** - Modern, clean interface
- **Responsive Layout** - Adaptive design for all screen sizes
- **Form Validation** - Required field validation and error handling
- **Loading States** - User feedback during operations
- **404 Not Found Page** - Custom error page for unknown routes

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v5
- **Authentication**: Firebase Auth
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hrms-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password
   - Update Firebase configuration in `src/firebase.js`:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🔐 Demo Credentials

Use these credentials to test the application:

- **Email**: `admin@company.com`
- **Password**: `password123`

## 📱 Usage Guide

### Login

1. Navigate to the login page
2. Enter demo credentials or your Firebase user credentials
3. Click "Sign In" to access the dashboard

### Dashboard Navigation

- **Dashboard**: Overview with summary cards and recent activities
- **Employee Directory**: Manage employee information
- **Leave Requests**: Handle leave applications
- **My Profile**: View and edit personal information
- **Reports**: View analytics (placeholder)
- **Settings**: Application settings (placeholder)

### Employee Management

1. Navigate to "Employee Directory"
2. Use search bar to find specific employees
3. Filter by department using the dropdown
4. Click "Add Employee" to create new entries
5. Use edit/delete icons for existing employees

### Leave Management

1. Navigate to "Leave Requests"
2. Filter by status (All, Pending, Approved, Rejected)
3. Click "New Request" to create leave applications
4. Use edit/delete icons for existing requests

### Profile Management

1. Navigate to "My Profile"
2. Click "Edit Profile" to modify information
3. Update personal details (local state only)
4. Click "Save" to confirm changes

## 🎨 Customization

### Theme Customization

- Modify theme colors in `src/ThemeContext.jsx`
- Add custom Material-UI theme overrides
- Implement additional theme modes

## 🔄 Version History

- **v1.0.0** - Initial release with core HRMS features
- Authentication and user management
- Employee directory with CRUD operations
- Leave request management
- Responsive dashboard design
- Dark mode support

---

**Built with ❤️ using React and Material-UI**
