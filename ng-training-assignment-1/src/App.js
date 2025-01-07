import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskService from "./services";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    TaskService.getTasks()
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleNewTask = () => {
    setCurrentTask({
      id: null,
      assignedTo: "",
      status: "Not Started",
      dueDate: "",
      priority: "Normal",
      comments: "",
    });
    setShowForm(true);
  };

  const handleSaveTask = (task) => {
    const method = task.id ? "updateTask" : "saveTask";
    console.log("handleSaveTask", task, method);
    TaskService[method](task.id ? task.id : task)
      .then(() => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        setCurrentTask(null);
        setShowForm(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error saving task:", error);
      });
  };

  const handleDeleteTask = (id) => {
    TaskService.deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  return (
    <div className="App">
      <div className="task-header">
        <div className="task-brand">
          <div className="task-brand-header">Tasks</div>
          <div className="task-brand-sub-header">All Tasks</div>
          {tasks?.length ? (
            <div className="task-count">{tasks?.length} records</div>
          ) : (
            ""
          )}
        </div>
        <div className="task-controls">
          <div>
            <button onClick={handleNewTask}>New Task</button>
            <button
              onClick={() =>
                console.log("Refresh functionality to be implemented")
              }
            >
              Refresh
            </button>
          </div>
          <div>
            <input type="search" placeholder="Search" />
          </div>
        </div>
      </div>
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      {showForm && (
        <TaskForm
          task={currentTask}
          onSave={handleSaveTask}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
