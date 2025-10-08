
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateBoard() {
  const [input, setInput] = useState("")
  const navigate = useNavigate();

  const create = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/createBoard", { boardName: input })
      if (res.status === 201) {
        navigate("/")
      }
    } catch (error) {
      console.log("Error creating board:", error)
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <div className="w-80 flex flex-col gap-4">
        <h2 className="">Create New Board</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="input" className=" font-medium">Board Name</label>
          <input
            id="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter board name"
            className="border border-gray-300 rounded-md px-2 py-2 "
          />
        </div>

        <button
          onClick={create}
          className="py-2 rounded-md text-white bg-black "
        >
          Create Board
        </button>
      </div>
    </div>
  )
}

export default CreateBoard
