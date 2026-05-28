import React, { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3001/api/expenses/get-expenses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setExpenses(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenses();
  }, []);

  return (
    
      <div>
        <div>Dashboard</div>
        {expenses.map((expense) => {
          return (
            <div key={expense._id}>
              <h2>{expense.title}</h2>
              <h3>{expense.amount}</h3>
              <h3>{expense.category}</h3>
              <h3>{new Date(expense.date).toLocaleDateString()}</h3>
            </div>
          );
        })}
        <button onClick={() => {
          navigate("/add-expense");
        }}>
          Add Expense
        </button>
        <button onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>Logout</button>
      </div>
    
  );
}

export default Dashboard;
