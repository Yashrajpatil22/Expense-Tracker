import express from "express";
import { User } from "../models/User.model.js";

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password });
    const token = user.generateToken();

    return res.status(201).json({
      message: "User registered successfully",
      user: { email: user.email, _id: user._id },
      token,
    });
  } catch (err) {
    console.log("Error registering user", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = user.generateToken();
    return res.status(200).json({
      message: "Login successful",
      user: { email: user.email, _id: user._id },
      token,
    });
  } catch (err) {
    console.log("Failed to login", err);
    return res.status(500).json({ message: "Login Unsucessful" });
  }
};

export { registerUser, loginUser };
