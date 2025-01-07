import axios from "axios";

const API_URL = "http://localhost:3001/tasks";

class TaskService {
  static getTasks() {
    return axios.get(API_URL);
  }

  static saveTask(task) {
    console.log("save task", task);
    return axios.post(API_URL, task);
  }

  static updateTask(id, task) {
    return axios.put(`${API_URL}/${id}`, task);
  }

  static deleteTask(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default TaskService;
