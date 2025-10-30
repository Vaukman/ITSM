import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgot_password";
import Profile from "./pages/page_components/profile";
import Dashboard from "./pages/page_components/dashboard";
import DashLayout from "./layouts/dashLayout";
import Members from "./pages/page_components/members";
import Help from "./pages/page_components/help";
import Tasks from "./pages/page_components/tasks";
import Reports from "./pages/page_components/reports";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route path="/" element={<DashLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="members" element={<Members />} />
          <Route path="help" element={<Help />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
