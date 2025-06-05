import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./custom/Dashboard";
import MindMap from "./custom/MindMap";
import Login from "./custom/Login";
export default function App() {
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/mindmap/:mapId"
          element={isLoggedIn ? <MindMap /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
