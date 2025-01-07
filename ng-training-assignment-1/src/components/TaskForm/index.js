import React, { useState, useEffect } from "react";

function TaskForm({ task, onSave, onClose }) {
  const [assignedTo, setAssignedTo] = useState(task ? task.assignedTo : "");
  const [status, setStatus] = useState(task ? task.status : "Not Started");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const [priority, setPriority] = useState(task ? task.priority : "Normal");
  const [description, setDescription] = useState(task ? task.description : "");

  useEffect(() => {
    if (task) {
      setAssignedTo(task.assignedTo || "");
      setStatus(task.status || "Not Started");
      setDueDate(task.dueDate || "");
      setPriority(task.priority || "Normal");
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      assignedTo,
      status,
      dueDate,
      priority,
      description,
    };

    if (task && task.id) {
      taskData.id = task.id;
    }

    // Validate form fields (optional)
    if (!assignedTo || !dueDate || !priority) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("taskData", taskData);

    // Call onSave and pass the task data to it
    onSave(taskData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <label>
            Assigned To
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a user
              </option>
              <option value="User 1">User 1</option>
              <option value="User 2">User 2</option>
            </select>
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label>
            Due Date
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>
          <label>
            Priority
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          <div className="actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
