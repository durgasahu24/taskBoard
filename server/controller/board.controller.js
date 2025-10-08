import Board from "../models/board.model.js";


const createBoard = async (req, res) => {

    try {

        const { boardName } = req.body;

        console.log("boardname ",boardName);

        if (!boardName) {
            return res.status(400).json({ message: "board name is required" })
        }


        const board = await Board.findOne({ boardName })

        if (board) {
            return res.status(400).json({ message: "board is already exist" });
        }

        const newBoard = Board.create({
            boardName
        })

        return res.status(201).json({ message: "board is created successfully ", board: newBoard });


    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}


const fetchAllBoard = async (req, res) => {

    try {
        const boards = await Board.find();
        return res.status(200).json(boards);

    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}


export default {
    createBoard,
    fetchAllBoard
}