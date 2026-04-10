import { Routes, Route } from "react-router-dom";
import CalculatorPage from "./pages/CalculatorPage";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CalculatorPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}