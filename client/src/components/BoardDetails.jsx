import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateTask from './UpdateTask';

function BoardDetails() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    console.log("taskts ", tasks);

    const params = useParams();
    console.log("params", params);

    useEffect(() => {

        let boardId = params.id

        console.log("board id ", boardId);
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

        console.log("id for deletion ", id);
        try {
            const res = await axios.delete(`http://localhost:8000/api/task/delete/${id}`);
            console.log('Deleted:', res.data);
            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch (error) {
            console.log('Error deleting task:', error);
        }
    };

    const updateTaskStatus = async (id, newStatus) => {
        try {
            const res = await axios.put(`http://localhost:8000/api/task/updateStatus/${id}`, {
                status: newStatus,
            });
            console.log('Updated:', res.data);

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === id ? { ...task, status: newStatus } : task
                )
            );
        } catch (error) {
            console.log('Error updating task:', error);
        }
    };



    const createTask = (id) => {
        navigate(`/createTask/${params.id}`);
    };



    return (
        <div>
            <h1 className="text-black text-3xl text-center mt-6 font-bold w-full">Board Details</h1>
            <p className="text-xl font-bold mt-4 ml-7">All Tasks</p>

            <div className="flex justify-between mx-11 mt-6 items-start ">
                <div className="space-y-2">
                    {tasks.length === 0 ? (
                        <h2>No tasks available</h2>
                    ) : (
                        tasks?.map((task) => (
                            <div key={task._id} className="flex items-start flex-col gap-3 mt-5 ">
                                <div >
                                    <h1 className="font-medium">Title :-   {task?.title}</h1>
                                    <h1 className="font-medium">AssignedTo :- {task?.assignedTo}</h1>
                                    <h1 className="font-medium">Description :- </h1>
                                    <h1 className="font-medium ">{task?.description}</h1>
                                    <h1 className="font-medium">
                                        Due Date :- {task?.dueDate ? new Date(task?.dueDate).toLocaleDateString() : "N/A"}
                                    </h1>


                                </div>

                                <div className='flex  gap-4 '>


                                    <select
                                        value={task?.status}
                                        onChange={(e) => updateTaskStatus(task?._id, e.target.value)}
                                        className="border"
                                    >
                                        <option value="Change Status" disabled>Change Status</option>
                                        <option value="Todo">Todo</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>


                                    <button
                                        onClick={() => navigate(`/task/update/${task?._id}`)}
                                        className='whitespace-nowrap py-1 rounded-md text-white bg-black px-2'
                                    >
                                        Update Task
                                    </button>

                                    <button
                                        onClick={() => deleteTask(task?._id)}
                                        className='whitespace-nowrap  py-1 rounded-md text-white bg-black px-2'

                                    >
                                        Delete
                                    </button>


                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div>
                    <button
                        className="py-2 rounded-md text-white bg-black px-2 whitespace-nowrap"
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
