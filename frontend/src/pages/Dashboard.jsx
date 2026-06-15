import React, { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
        console.log(response.data.totalPages);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    fetchExpenses();
  }, []);

  const deleteExpense = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:3001/api/expenses/delete-expense/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = expenses.filter((expense) => expense._id !== id);
      setExpenses(data);
    } catch (error) {
      console.log("Failed to delete");
    }
  };

  useEffect(() => {
    const fetchExpensesByFilter = async () => {
      const token = localStorage.getItem("token");
      let response;
      try {
        if (filter === "All") {
          response = await axios.get(
            `http://localhost:3001/api/expenses/get-expenses`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
        else{
          response = await axios.get(
            `http://localhost:3001/api/expenses/get-expenses?filter=${filter}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
        setExpenses(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpensesByFilter();
  }, [filter]);

  useEffect(() => {
    const fetchExpensesByFilter = async () => {
      const token = localStorage.getItem("token");
      let response;
      try {
          response = await axios.get(
            `http://localhost:3001/api/expenses/get-expenses?page=${page}`,
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
    fetchExpensesByFilter();
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
        <label className="text-slate-300">Filter:</label>
        <select
          className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
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
            <div className="flex gap-4 mt-2 justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 rounded-lg p-2 font-semibold cursor-pointer"
                onClick={() => {
                  navigate(`/edit-expense/${expense._id}`);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 rounded-lg p-2 font-semibold cursor-pointer"
                onClick={() => deleteExpense(expense._id)}
              >
                Delete
              </button>
            </div>
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
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="text-slate-300 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
