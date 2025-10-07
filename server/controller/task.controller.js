import mongoose from "mongoose";
import TASK from "../models/task.model.js";

const createTask = async (req, res) => {

    try {

        const { title, description, status, priority, assignedTo, dueDate, boardBelongTo } = req.body;

        if (!title || !description || !status || !priority || !assignedTo || !dueDate || !boardBelongTo) {
            return res.status(400).json({ message: "all feilds are required" })
        }

        const prevTask = await TASK.findOne({ title });

        if (prevTask) {
            return res.status(400).json({ message: "task name is already exist" });
        }

        const newTask = TASK.createTask({
            title,
            description,
            status,
            priority,
            assignedTo,
            dueDate,
            boardBelongTo
        })


        return res.status(201).json({ message: "task created successfully " });


    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}

const fetAllTask = async (req, res) => {
    try {
        const tasks = await TASK.find();

        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}


const updateTask = async (req, res) => {

    const task = await TASK.findById(req.params.id)
    task.status = req.body;
    task.save();
    return res.status(200).json({ message: "task updated succesfully" })
}

const deleteTaskById = async (req, res) => {
    const deltedTsk = await TASK.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "task delted sucessfully" });
}

export default {
    createTask,
    fetAllTask,
    updateTask,
    deleteTaskById
}