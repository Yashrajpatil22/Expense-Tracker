import express from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/Expense.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create").post(authenticateUser, createExpense);

router.route("/get-expenses").get(authenticateUser, getExpenses);

router.route("/update-expense/:expenseId").put(authenticateUser, updateExpense);

router.route("/delete-expense/:expenseId").delete(authenticateUser,deleteExpense)


export default router;
