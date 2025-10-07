import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
    boardName:{
        type:String,
        unique:true,
        required:true
    }
},{
    createdAt:true
})


const Board = new mongoose.model("BOARD",boardSchema);

export default Board;