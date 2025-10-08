import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AllBoards from './components/AllBoards'
import CreateBoard from './components/CreateBoard'
import BoardDetails from './components/BoardDetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateTask from './components/CreateTask'
import UpdateTask from './components/UpdateTask'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllBoards />} />
          <Route path="/create-board" element={<CreateBoard />} />
          <Route path="/board/:id" element={<BoardDetails />} />
          <Route path="/createTask/:id" element={<CreateTask />} />
          <Route path="/task/update/:id" element={<UpdateTask />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
