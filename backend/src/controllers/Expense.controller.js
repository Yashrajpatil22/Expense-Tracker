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
  const { filter, startDate, endDate } = req.query;
  let { page, limit } = req.query;
  const {sort} = req.query;
  if(!page){
    page = "1";
  }
  if(!limit){
    limit = "5";
  }
  const pageNumber = Number.parseInt(page);
  const limitNumber = Number.parseInt(limit);
  if(isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0){
    return res.status(400).json({ message: "Invalid page or limit values" });
  }
  const skip = (pageNumber - 1) * limitNumber;
  try {
    let data;
    
    const query = { owner: req.user._id };
    const sortQuery = { date: -1};
    if (filter){
      const today = new Date();
      let checkDate = new Date();
      if(filter === "week"){
        let i = checkDate.getDate();
        i = i - 7;
        checkDate.setDate(i);
      }
      else if(filter === "month"){
        let i = checkDate.getMonth();
        i = i - 1;
        checkDate.setMonth(i);
      }
      else if(filter === "year"){
        let i = checkDate.getFullYear();
        i = i - 1;
        checkDate.setFullYear(i);
      }
      else{
        return res.status(400).json({ message: "Invalid filter value" });
      }
      // data = await Expense.find({ owner: req.user._id, date: { $gte: checkDate, $lte: today } });
      query.date = { $gte: checkDate, $lte: today };
    }
    else if (startDate || endDate) {
      if((startDate && !endDate) || (endDate && !startDate)){
        return res.status(400).json({ message: "Both startDate and endDate are required" });
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      if(start > end){
        return res.status(400).json({ message: "startDate cannot be greater than endDate" });
      }
      // data = await Expense.find({ owner: req.user._id, date: { $gte: start, $lte: end } });
      query.date = { $gte: start, $lte: end };
    }
    if(sort){
      if(sort){
        if(sort === "oldest"){
          sortQuery.date = 1;
        }
        else if(sort === "amountAsc"){
          delete sortQuery.date;
          sortQuery.amount = 1;
        }
        else if(sort === "amountDesc"){
          delete sortQuery.date;
          sortQuery.amount = -1;
        }
        else if(sort === "latest"){
          sortQuery.date = -1;
        }
        else{
          return res.status(400).json({ message: "Invalid sort value" });
        }
      }
    }
    
    data = await Expense.find(query).sort(sortQuery).skip(skip).limit(limitNumber);
    
    return res
      .status(200)
      .json({ message: "Expenses fetched successfully", data });
  } catch (error) {
    console.log("Something went wrong while fetching expenses", error);
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching expenses" });
  }
};

const updateExpense = async (req, res) => {
  const { title, category, amount, date } = req.body;
  const { expenseId } = req.params;
  if (!title && !category && !amount && !date) {
    return res.status(400).json({ message: "Atleast one field is required" });
  }
  try {
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res
        .status(404)
        .json({ message: "Expense with this id not found" });
    }
    if (!expense.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
    if (title && title?.trim() != "") {
      expense.title = title.trim();
    }
    if (amount || amount === 0) {
      expense.amount = amount;
    }
    if (category) {
      expense.category = category;
    }
    if (date) {
      expense.date = date;
    }
    await expense.save();

    return res.status(200).json({ message: "Updation successful", expense });
  } catch (error) {
    console.log("Failed to update", error);
    return res.status(500).json({ message: "Failed to update" });
  }
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;
  try {
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense with the id not found" });
    }
    if (!expense.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
    await Expense.deleteOne({ _id: expenseId });
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log("Something went wrong while deleting expense", error);
    return res
      .status(500)
      .json({ message: "Something went wrong while deleting expense" });
  }
};

export { createExpense, getExpenses, updateExpense, deleteExpense };
