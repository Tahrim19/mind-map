import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./custom/Dashboard";
import MindMap from "./custom/MindMap";
import Login from "./custom/Login";
import Register from "./custom/Register";
export default function App() {
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/mindmap/:mapId"
          element={isLoggedIn ? <MindMap /> : <Navigate to="/" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
