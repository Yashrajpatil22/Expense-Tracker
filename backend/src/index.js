import express from "express";
import connectDB from "./db/index.js";
import userRouter from "./routes/User.route.js";
import expenseRouter from "./routes/Expense.route.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://expense-tracker-one-rose-70.vercel.app"
}));
app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

connectDB()
  .then(
    () => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    
  )
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });