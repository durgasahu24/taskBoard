import express from 'express';
const route = express.Router();
import boardController from '../controller/board.controller.js';


route.post("/createBoard",boardController.createBoard);
route.get("/fetchBoards",boardController.fetchAllBoard);


export default route;