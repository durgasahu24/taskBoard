import mongoose from "mongoose";

const taskSchma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Todo", "In Progress", "Done"]
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "Height"]
    },
    assignedTo: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date
    },
    boardBelongTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BOARD"
    }
}, {
    createdAt: true
})

const TASK = mongoose.model("TASK", taskSchma);

export default TASK;