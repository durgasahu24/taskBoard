# TaskBoard

A Trello-like task management / team collaboration app built with **MERN** (MongoDB, Express, React, Node.js).  
Users can create boards, add tasks, update status, search & filter tasks, and more.

---

## 🚀 Features

- **Boards**  
  Create multiple boards to organize different projects or teams.

- **Tasks**  
  Create, edit, delete tasks. Each task has:  
  - Title  
  - Description  
  - Status (Todo / In Progress / Done)  
  - Priority (Low / Medium / High)  
  - Assigned To  
  - Due Date  
  - Belongs to a board

- **Task Status Update**  
  You can change the status of a task via dropdown or drag-and-drop (planned).

- **Search & Filter**  
  Filter tasks by title and by priority.

- **CORS & Deployment Ready**  
  Backend allows requests from your frontend origin; configured for deployment.

---

## 🏗️ Tech Stack

| Layer       | Technology                         |
|-------------|--------------------------------------|
| Backend     | Node.js, Express, MongoDB, Mongoose |
| Frontend    | React, Tailwind CSS, Axios          |
| Deployment  | Render (backend), Vercel (frontend) |

---

## 📁 Folder Structure (Example)


---

## 🛠️ Setup & Running Locally

### Prerequisites

- Node.js installed  
- A MongoDB URI (you can use MongoDB Atlas)  
- `0.0.0.0/0` allowed temporarily (for dev) or specific IPs in production

### Backend Setup

1. `cd server`  
2. Create `.env` file with:  
  3. Install dependencies:  
```bash
npm install


VITE_API_URL=http://localhost:8000

npm install

npm run dev

npm run build

