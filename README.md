# Expense Tracker

A full-stack Expense Tracker application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT Authentication.

Users can register, log in securely, manage their expenses, filter and sort records, and navigate through paginated expense data.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* Automatic Logout on Invalid/Expired Token
* User-specific Expense Access

### Expense Management

* Create Expense
* View Expenses
* Update Expense
* Delete Expense

### Dashboard Features

* Pagination
* Expense Sorting

  * Latest First
  * Oldest First
  * Amount Ascending
  * Amount Descending
* Expense Filtering

  * Last Week
  * Last Month
  * Last Year

### Security

* Password Hashing using bcrypt
* JWT Verification Middleware
* Ownership Validation for User Data

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcrypt

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

### Expenses

| Method | Endpoint                                |
| ------ | --------------------------------------- |
| POST   | /api/expenses                           |
| GET    | /api/expenses/get-expenses              |
| GET    | /api/expenses/get-expense/:expenseId    |
| PUT    | /api/expenses/update-expense/:expenseId |
| DELETE | /api/expenses/delete-expense/:expenseId |

---

## Query Parameters

### Filtering

```http
GET /api/expenses/get-expenses?filter=week
GET /api/expenses/get-expenses?filter=month
GET /api/expenses/get-expenses?filter=year
```

### Sorting

```http
GET /api/expenses/get-expenses?sort=latest
GET /api/expenses/get-expenses?sort=oldest
GET /api/expenses/get-expenses?sort=amountAsc
GET /api/expenses/get-expenses?sort=amountDesc
```

### Pagination

```http
GET /api/expenses/get-expenses?page=1&limit=5
```

---

## Learning Outcomes

This project helped in understanding:

* REST API Development
* JWT Authentication
* React State Management
* React Router
* Protected Routes
* CRUD Operations
* MongoDB Integration
* Pagination
* Filtering and Sorting
* Frontend-Backend Communication

Built as part of a Backend Development learning journey.
