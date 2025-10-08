import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BoardDetails() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState(""); // search input
  const [priorityFilter, setPriorityFilter] = useState(""); // priority filter
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const boardId = params.id;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/task/taskdata/${boardId}`);
        setTasks(res.data);
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [params.id]);


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/task/delete/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/task/updateStatus/${id}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, status: newStatus } : task))
      );
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };

  const createTask = () => {
    navigate(`/createTask/${params.id}`);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
    return matchesTitle && matchesPriority;
  });

  const tasksByStatus = {
    Todo: filteredTasks.filter((t) => t.status === "Todo"),
    "In Progress": filteredTasks.filter((t) => t.status === "In Progress"),
    Done: filteredTasks.filter((t) => t.status === "Done"),
  };

  return (
    <div>
      <h1 className="text-black text-3xl text-center mt-6 font-bold w-full">Board Details</h1>

      {/* Filters */}
      <div className="flex gap-4 mx-11 mt-4">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 w-1/2"
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="flex justify-between mx-11 mt-6 items-start">
        
        {["Todo", "In Progress", "Done"].map((status) => (
          <div key={status} className="w-1/3 px-2">
            <h2 className="text-xl font-bold mb-4">{status}</h2>
            {tasksByStatus[status].length === 0 ? (
              <p className="text-gray-500">No tasks</p>
            ) : (
              tasksByStatus[status].map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-md mb-3">
                  <h3 className="font-medium">Title: {task.title}</h3>
                  <p>Assigned To: {task.assignedTo}</p>
                  <p>Description: {task.description}</p>
                  <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
                  <p>Priority: {task.priority}</p>

                  <div className="flex gap-2 mt-2">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      className="border px-2 py-1"
                    >
                      <option value="Change Status" disabled>Change Status</option>
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>

                    <button
                      onClick={() => navigate(`/task/update/${task._id}`)}
                      className="whitespace-nowrap py-1 rounded-md text-white bg-black px-2"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="whitespace-nowrap py-1 rounded-md text-white bg-red-600 px-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}

        <div className="ml-4">
          <button
            className="py-2 rounded-md text-white bg-black px-4  whitespace-nowrap"
            onClick={createTask}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardDetails;

