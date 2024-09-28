const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "rutik",
  password: "Test@12345",
  database: "todo_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  console.log("tasks req", req.body);
  const { assignedTo, status, dueDate, priority, description } = req.body;

  if (!assignedTo || !status || !dueDate || !priority) {
    return res.status(400).send("Missing required fields");
  }

  const task = { assignedTo, status, dueDate, priority, description };
  console.log("task", task);

  db.query("INSERT INTO tasks SET ?", task, (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, ...task });
  });
});

// Update an existing task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = req.body;
  db.query("UPDATE tasks SET ? WHERE id = ?", [task, id], (err, result) => {
    if (err) throw err;
    res.send({ id, ...task });
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", id, (err, result) => {
    if (err) throw err;
    res.send({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
