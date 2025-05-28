import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import UserInfo from "./pages/UserInfo";
import { CssBaseline } from "@mui/material";
import Chat from "./pages/Chat";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Chat />} />
            <Route path="/user-info" element={<UserInfo />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />{" "}
          {/* Redirect to default */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
