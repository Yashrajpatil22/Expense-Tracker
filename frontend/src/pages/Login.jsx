import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/users/login", {
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div
        id="login-container"
        className="border-slate-700 border-2 rounded-2xl p-8 bg-slate-900 flex flex-col gap-4 w-96"
      >
        <h2 className="text-white text-2xl font-bold text-center">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Email:</label>
            <input
              type="email"
              placeholder="Email"
              className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-300">Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="bg-slate-800 text-white border border-slate-700 rounded-md mx-2 p-1"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-1 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
