import React, { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
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
    <ProtectedRoute>
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
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;
