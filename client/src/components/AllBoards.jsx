import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllBoards() {

  const [Boards, setBoards] = useState([]);
  const [search, setSearch] = useState(""); // search input state
  const navigate = useNavigate();

  console.log("url ", import.meta.env.VITE_API_URL)

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetchBoards`);
        setBoards(res?.data);
      } catch (err) {
        console.error("Error fetching boards:", err);
      }
    }
    fetchBoards();
  }, []);

  function createboard() {
    navigate("/create-board");
  }

  function boarddetail(id) {
    navigate(`/board/${id}`);
  }

  const filteredBoards = Boards.filter(board =>
    board.boardName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className='text-black text-3xl text-center mt-6 font-bold'>Team Collaboration Board</h1>

      <div className='flex justify-between mx-11 mt-6 items-start'>

        <div>
          <h1 className='text-xl font-bold'>All Boards</h1>

          {/* Search Input */}
          <div className='mt-4'>
            <input
              type="text"
              placeholder="Search boards..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>

          {filteredBoards.length === 0 ? (
            <h1 className='mt-8'>No boards found. Please create one!</h1>
          ) : (
            <div className='mt-8'>
              {filteredBoards.map((board) => (
                <div key={board?._id} className='mt-6 py-1 flex gap-4 rounded-md text-white bg-black px-4'>
                  <span onClick={() => boarddetail(board?._id)}>{board?.boardName}</span>
                </div>
              ))}
            </div>
          )}

        </div>

        <button onClick={createboard} className='py-2 rounded-md text-white bg-black px-2'>Create Board</button>
      </div>
    </div>
  )
}

export default AllBoards;
