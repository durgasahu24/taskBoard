import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CreateTask() {
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

    function handleChange(e) {
        setTask({ ...Task, [e.target.name]: e.target.value });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/task/createTask", Task);
            console.log("Task created:", res.data);
            navigate(`/board/${params.id}`);
        } catch (err) {
            console.error("Error creating task:", err);
        }
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <form onSubmit={handlesubmit}>
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
                <div className='mt-6 flex gap-4' >
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
                    <input type="text" value={Task.assignedTo} onChange={handleChange} name='assignedTo' placeholder='Assigned To'  className='border border-gray-300 rounded-md px-2'/>
                </div>
                <div className='mt-6 flex gap-4'>
                    <label>Due Date</label>
                    <input type="date" value={Task.dueDate} onChange={handleChange} name='dueDate' />
                </div>
                <button className='mt-6 flex gap-4 py-1 rounded-md text-white bg-black px-4 ' type='submit'>Create Task</button>
            </form>
        </div>
    )
}

export default CreateTask;
