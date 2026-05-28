import React, { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </div>
      {expenses.map((expense) => {
        return (
          <div
            key={expense._id}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-4"
          >
            <h2>{expense.title}</h2>
            <h3>{expense.amount}</h3>
            <h3>{expense.category}</h3>
            <h3>{new Date(expense.date).toLocaleDateString()}</h3>
          </div>
        );
      })}
      <div className="flex px-5 justify-between gap-4">
        <button
          className="bg-emerald-500 hover:bg-emerald-600 rounded-lg p-2 font-semibold w-full"
          onClick={() => {
            navigate("/add-expense");
          }}
        >
          Add Expense
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 rounded-lg p-2 font-semibold w-full"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
