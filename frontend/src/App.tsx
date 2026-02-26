import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;