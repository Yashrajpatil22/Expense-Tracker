import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Groceries");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const { expenseId } = useParams();


  useEffect(() => {
    const fetchExpense = async () => {
      const token = localStorage.getItem("token");

      try{
        const response = await axios.get(
          `http://localhost:3001/api/expenses/get-expense/${expenseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const expense = response.data.data;
        setTitle(expense.title);
        setAmount(expense.amount);
        setCategory(expense.category);
        setDate(expense.date.split("T")[0]); 
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    }
    fetchExpense();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3001/api/expenses/update-expense/${expenseId}`,
        {
          title,
          amount,
          category,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="border-slate-700 border-2 rounded-2xl p-8 bg-slate-900 flex flex-col gap-4 w-96">
        <h2 className="text-white text-2xl font-bold text-center">
          Edit Expense
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Title:</label>
            <input
              type="text"
              placeholder="Title"
              className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Amount:</label>
            <input
              type="number"
              placeholder="Amount"
              className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Category:</label>
            <select
              className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Groceries">Groceries</option>
              <option value="Leisure">Leisure</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Date:</label>
            <input
              type="date"
              className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-1 rounded-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditExpense;
