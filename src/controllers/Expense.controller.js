import express from "express";
import { Expense } from "../models/Expense.model.js";

const createExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  if (!title || !category || title.trim() === "") {
    return res.status(400).json({ message: "Title and category are required" });
  }
  try {
    const expense = await Expense.create({
      title: title.trim(),
      amount,
      category,
      date,
      owner: req.user._id,
    });
    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (err) {
    console.log("Error creating expense", err);
    res.status(500).json({ message: "Error creating expense" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const data = await Expense.find({ owner: req.user._id });
    return res
      .status(200)
      .json({ message: "Expenses fetched successfully", data });
  } catch (error) {
    console.log("Something went wrong while fetching expenses",error);
    return res.status(500).json({message: "Something went wrong while fetching expenses"})
    
  }
};

export { createExpense, getExpenses };
