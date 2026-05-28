import React from 'react'

function AddExpense() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="border-slate-700 border-2 rounded-2xl p-8 bg-slate-900 flex flex-col gap-4 w-96">
        <h2 className="text-white text-2xl font-bold text-center">
          Add Expense
        </h2>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Title:</label>
            <input
              type="text"
              placeholder="Title"
              className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Amount:</label>
            <input
              type="number"
              placeholder="Amount"
              className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Category:</label>
            <select className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1">
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
            />
          </div>
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white p-1 rounded-md">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense