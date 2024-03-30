import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";

import DashboardBase from "./pages/DashboardBase";
import Principal from "./pages/Principal";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DashboardBase />} />
          </Route>
         
        </Routes>
      </BrowserRouter>
    </AuthProvider>
      );
}

export default App;
