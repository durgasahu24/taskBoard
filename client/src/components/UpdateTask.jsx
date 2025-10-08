
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTask({ taskData }) {
    const params = useParams();
    const navigate = useNavigate();

    const [Task, setTask] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
        assignedTo: "",
        dueDate: "",
        boardBelongTo: params?.id
    });

    const [taskId,setTaskId] = useState("")


    const { id } = useParams();
    console.log("id ", id)
    useEffect(() => {
        const fetchTask = async () => {
            const res = await axios.get(`http://localhost:8000/api/task/taskById/${id}`);
            console.log("res ", res)
            setTask({
                title: res.data.title,
                description: res.data.description,
                status: res.data.status,
                priority: res.data.priority,
                assignedTo: res.data.assignedTo,
                dueDate: res.data.dueDate ? res.data.dueDate.split("T")[0] : "",
                boardBelongTo: res.data.boardBelongTo
            });
            setTaskId(res.data._id)
        }
        fetchTask();
    }, [id]);


    function handleChange(e) {
        setTask({ ...Task, [e.target.name]: e.target.value });
    }



    const handleUpdate = async (e) => {
        e.preventDefault();

        console.log("task ",Task)
        const res = await axios.put(`http://localhost:8000/api/task/update/${taskId}`,Task);
        navigate(`/board/${Task.boardBelongTo}`);
    }


    return (
        <div className='h-screen flex justify-center items-center'>
            <form onSubmit={handleUpdate}>
                <div className='mt-6 flex gap-4'>
                    <label>Title</label>
                    <input type="text" value={Task.title} onChange={handleChange} name='title' placeholder='Enter Title' className='border border-gray-300 rounded-md px-2' />
                </div>
                <div className='mt-6 flex gap-4'>
                    <label>Description</label>
                    <input type="text" value={Task.description} onChange={handleChange} name='description' placeholder='Enter Description' className='border border-gray-300 rounded-md px-2' />
                </div>
                <div className='mt-6 flex gap-4'>
                    <label>Status</label>
                    <select value={Task.status} onChange={handleChange} name='status'>
                        <option value="">Select Status</option>
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className='mt-6 flex gap-4'>
                    <label>Priority</label>
                    <select value={Task.priority} onChange={handleChange} name='priority'>
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className='mt-6 flex gap-4'>
                    <label>Assigned To</label>
                    <input type="text" value={Task.assignedTo} onChange={handleChange} name='assignedTo' placeholder='Assigned To' className='border border-gray-300 rounded-md px-2' />
                </div>
                <div className='mt-6 flex gap-4'>
                    <label>Due Date</label>
                    <input type="date" value={Task.dueDate} onChange={handleChange} name='dueDate' />
                </div>
                <button className='mt-6 flex gap-4 py-1 rounded-md text-white bg-black px-4' type='submit'>Update Task</button>
            </form>
        </div>
    )
}

export default UpdateTask;

