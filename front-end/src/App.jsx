import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/Authcontext";
import { useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Preference from "./pages/Preference";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashBoardLayout";


const App = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(" Global user state changed:", user);
  }, [user]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
           <DashboardLayout/>
          </PrivateRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="preferences" element={<Preference />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard/home" />} />
    </Routes>
  );
};

export default App;