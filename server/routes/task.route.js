import express from 'express';
import taskController from '../controller/task.controller.js';

const route = express.Router();

route.post('/createTask', taskController.createTask);
route.get('/allTask', taskController.fetAllTask);
route.put('/updateStatus/:id', taskController.updateTaskStatus);
route.delete('/delete/:id', taskController.deleteTaskById);
route.get('/taskdata/:id', taskController.fetchTasksByBoardId);
route.get('/taskById/:id',taskController.taskById)
route.put("/update/:id",taskController.updateTaskFully);

export default route;
