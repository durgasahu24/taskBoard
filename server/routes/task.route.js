import taskController from "../controller/task.controller.js";
import express from 'express'
const route = express.Router();


route.post("/creteTask",taskController.createTask);
route.post("/delete:id",taskController.deleteTaskById);
route.get("/allTask",taskController.fetAllTask);
route.put("/udpateTask",taskController.updateTask);



export default route;
