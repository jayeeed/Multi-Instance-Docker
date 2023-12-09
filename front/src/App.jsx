import { useState, useEffect } from "react";
import axios from "axios";
import EditTaskModal from "./EditTaskModal";

const API_URL = "http://127.0.0.1:5000/";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title: newTask });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditButtonClick = (task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  const handleEditTask = async (editedTask) => {
    try {
      await axios.put(`${API_URL}/tasks/${editingTask._id}`, {
        title: editedTask,
      });
      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? { ...task, title: editedTask } : task
        )
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="text-center top-0 pt-2 mx-40">
      <h1 className="text-2xl font-semibold mb-2">Task List</h1>
      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b border-r border-black">Task</th>
            <th className="py-2 px-4 border-b border-r border-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {tasks.map((task) => (
            <tr key={task._id} className="border-b border-black">
              <td className="py-2 px-4 text-black border-r border-black">
                {task.title}
              </td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditButtonClick(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        task={editingTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default App;
