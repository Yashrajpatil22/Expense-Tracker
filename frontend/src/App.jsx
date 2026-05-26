import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import EditExpense from "./pages/EditExpense"

function App() {
  
return (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/edit-expense/:expenseId" element={<EditExpense />} />
  </Routes>
  )
}


export default App
