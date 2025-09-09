# RTK Query + JSON Server CRUD Web-App

This project is a simple **CRUD (Create, Read, Update, Delete)** web application built with **React + Redux Toolkit Query (RTK Query)** for API state management and **JSON Server** as a mock backend database.

---

## 🚀 Features
- Fetch users from a JSON Server (REST API)
- Add new users
- Edit and update existing users
- Delete users
- Clean and responsive UI with `App.css`

---


## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd "RTK Query + JSON Server CRUD Web-APP"
npm install 
```


## ▶️ Running the App

<span style="color:red; font-weight:bold">This project requires two terminals </span>

#### 1️⃣ Run React App
From the project root folder:
```bash
npm run dev
```
This will start the Vite dev server for the React app.
By default, it runs on http://localhost:5173
.

#### 2️⃣ Run JSON Server

Open a new terminal, navigate to the JSON Server folder, and run:

```bash
cd "JSON Server"
npx json-server db.json
```

This will start the JSON Server on http://localhost:3000


**Available endpoints:**

-- GET http://localhost:3000/users

-- POST http://localhost:3000/users

-- PUT http://localhost:3000/users/:id

-- DELETE http://localhost:3000/users/:id


## 🛠️ Tech Stack

React 18 + Vite
Redux Toolkit Query (RTK Query) – API data fetching and caching
JSON Server – Fake REST API
CSS – For styling

## 📖 Notes
The JSON Server database is located inside the JSON Server folder as db.json.
Make sure both servers (React + JSON Server) are running simultaneously.
RTK Query automatically manages caching and state updates for CRUD operations.

✅ Example db.json
```bash
{
  "users": [
    {
      "id": "793a",
      "firstName": "Darao",
      "lastName": "Padre",
      "age": "10",
      "email": "padre@gmail.com"
    },
    {
      "id": "c63a",
      "firstName": "Lako",
      "lastName": "Dukre",
      "age": "40",
      "email": "dukre@gmail.com"
    }
  ]
}
```