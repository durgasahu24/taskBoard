import mongoose from "mongoose";
import TASK from "../models/task.model.js";
import Board from "../models/board.model.js"


const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            assignedTo,
            dueDate,
            boardBelongTo
        } = req.body;

        if (!title || !description || !assignedTo || !boardBelongTo) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const board = await Board.findById(boardBelongTo);
        if (!board) {
            return res.status(404).json({ message: "Board not found." });
        }

        const newTask = await TASK.create({
            title,
            description,
            status: status || "Todo",
            priority: priority || "Low",
            assignedTo,
            dueDate,
            boardBelongTo
        });

        return res.status(201).json({
            message: "Task created successfully!",
            task: newTask
        });

    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Server error" });
    }
};






const fetchTasksByBoardId = async (req, res) => {
    try {
        console.log("req params ", req.params.id);
        const boardId = req.params.id;

        if (!boardId) {
            return res.status(400).json({ message: "Board ID is required" });
        }

        const tasks = await TASK.find({ boardBelongTo: boardId });

        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};





const updateTaskStatus = async (req, res) => {

    console.log("welcome to udpate ")
    try {
        const task = await TASK.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (req.body.status) {
            task.status = req.body.status;
        }

        await task.save();
        return res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



const deleteTaskById = async (req, res) => {
    try {
        const deletedTask = await TASK.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const taskById = async (req, res) => {
    try {
        const task = await TASK.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



export const updateTaskFully = async (req, res) => {

    console.log("welcom to update completely :")
    try {

        const task = await TASK.findById(req.params.id);


        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { title, description, status, priority, assignedTo, dueDate, boardBelongTo } = req.body;

        console.log("title, description, status, priority, assignedTo, dueDate, boardBelongTo ",title, description, status, priority, assignedTo, dueDate, boardBelongTo)


        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;
        if (priority !== undefined) task.priority = priority;
        if (assignedTo !== undefined) task.assignedTo = assignedTo;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (boardBelongTo !== undefined) task.boardBelongTo = boardBelongTo;

        await task.save();

        return res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Server error" });
    }
};




export default {
    createTask,
    fetAllTask,
    updateTaskStatus,
    deleteTaskById,
    fetchTasksByBoardId,
    taskById,
    updateTaskFully
}


