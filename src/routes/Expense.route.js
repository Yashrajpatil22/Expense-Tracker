import express from 'express';
import {
  createExpense,
  getExpenses,
} from "../controllers/Expense.controller.js";
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/create")
  .post(authenticateUser, createExpense);

router.route("/get-expenses")
  .get(authenticateUser,getExpenses)

export default router;