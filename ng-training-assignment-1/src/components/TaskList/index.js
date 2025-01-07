import React, { useState } from "react";
import TaskForm from "../TaskForm";
import TaskService from "../../services";

function TaskList({ tasks, onEdit, onDelete }) {
  console.log("tasks list", tasks);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  const toggleSelection = (taskId) => {
    const newSelection = new Set(selectedTasks);
    if (newSelection.has(taskId)) {
      newSelection.delete(taskId);
    } else {
      newSelection.add(taskId);
    }
    setSelectedTasks(newSelection);
  };

  const handleSaveTask = (task) => {
    console.log("Saving task:", task);
    if (!task.id) {
      console.error("Task ID is missing:", task);
      return;
    }

    TaskService.updateTask(task.id, task)
      .then(() => {
        console.log("update the task");
        const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
        onEdit(updatedTasks);

        setCurrentTask(null);
        setShowForm(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error saving task:", error);
      });
  };

  const handleAction = (action, taskId) => {
    if (action === "edit") {
      const taskToEdit = tasks.find((task) => task.id === taskId);
      console.log("taskToEdit", taskToEdit);
      setCurrentTask(taskToEdit);
      setShowForm(true);
    } else if (action === "delete") {
      onDelete(taskId);
    }
  };

  return (
    <div className="task-list-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={() =>
                  tasks.forEach((task) => toggleSelection(task.id))
                }
              />
            </th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  onChange={() => toggleSelection(task.id)}
                />
              </td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <select
                  onChange={(e) => handleAction(e.target.value, task.id)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Action
                  </option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default TaskList;
