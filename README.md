# TaskBoard

A Trello-like **task management / team collaboration app** built with **MERN** (MongoDB, Express, React, Node.js).
Users can create boards, add tasks, update status, search & filter tasks, and more.



## Features

* **Boards**
  Create multiple boards to organize different projects or teams.

* **Tasks**
  Create, edit, delete tasks. Each task includes:

  * Title
  * Description
  * Status (`Todo` / `In Progress` / `Done`)
  * Priority (`Low` / `Medium` / `High`)
  * Assigned To
  * Due Date
  * Belongs to a board

* **Task Status Update**
  Change the status of a task via dropdown. Drag-and-drop support can be added later.

* **Search & Filter**
  Filter tasks by title or priority.

* **CORS & Deployment Ready**
  Backend configured to allow requests from your frontend origin.



## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Backend    | Node.js, Express, MongoDB, Mongoose |
| Frontend   | React, Tailwind CSS, Axios          |
| Deployment | Render (backend), Vercel (frontend) |

---

## Folder Structure (Example)

```
taskboard/
├─ client/         # React frontend
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  └─ package.json
├─ server/         # Node.js backend
│  ├─ controller/
│  ├─ routes/
│  ├─ models/
│  ├─ db/
│  ├─ server.js
│  └─ package.json
└─ README.md
```

---

## Setup & Running Locally

### Prerequisites

* Node.js installed
* MongoDB URI (Atlas or local)
* `0.0.0.0/0` temporarily allowed for dev, or specific IPs for production



### Backend Setup

1. Navigate to backend folder:

```bash
cd server
```

2. Create `.env` file:

```env
PORT=8000
MONGO_URI=YOUR_MONGODB_URI
```

3. Install dependencies:

```bash
npm install
```

4. Run backend server:

```bash
npm run dev
```

---

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd client
```

2. Create `.env` file (for Vite):

```env
VITE_API_URL=http://localhost:8000
```

3. Install dependencies:

```bash
npm install
```

4. Run development server:

```bash
npm run dev
```

5. For production build:

```bash
npm run build
```

---

## API Endpoints

| Method | Endpoint                         | Description                            |
| ------ | -------------------------------- | -------------------------------------- |
| GET    | `/api/fetchBoards`               | Get all boards                         |
| POST   | `/api/createBoard`               | Create a new board                     |
| GET    | `/api/task/taskdata/:boardId`    | Get all tasks for a board              |
| POST   | `/api/task/createTask`           | Create a new task in a board           |
| PUT    | `/api/task/update/:taskId`       | Fully update a task                    |
| PUT    | `/api/task/updateStatus/:taskId` | Update only the status field of a task |
| DELETE | `/api/task/delete/:taskId`       | Delete a specific task                 |
| GET    | `/api/task/taskById/:taskId`     | Get a task by its ID                   |

---

## Sample Task Data

```json
[
  {
    "title": "Inventory Audit",
    "description": "Perform a full check of warehouse inventory and update records.",
    "status": "Todo",
    "priority": "High",
    "assignedTo": "Durga",
    "dueDate": "2025-10-18T00:00:00.000Z",
    "boardBelongTo": "OPERATIONS_BOARD_ID"
  },
  {
    "title": "Supplier Coordination",
    "description": "Contact suppliers to confirm delivery schedules.",
    "status": "In Progress",
    "priority": "Medium",
    "assignedTo": "Rishabh",
    "dueDate": "2025-10-20T00:00:00.000Z",
    "boardBelongTo": "OPERATIONS_BOARD_ID"
  },
  {
    "title": "Create Task Board UI",
    "description": "Design the board & task layout in React.",
    "status": "Todo",
    "priority": "Medium",
    "assignedTo": "Rishabh",
    "dueDate": "2025-10-18T00:00:00.000Z",
    "boardBelongTo": "DEVELOPMENT_BOARD_ID"
  },
  {
    "title": "Implement User Authentication",
    "description": "Develop login/signup using JWT with backend routes.",
    "status": "In Progress",
    "priority": "High",
    "assignedTo": "Durga",
    "dueDate": "2025-10-15T00:00:00.000Z",
    "boardBelongTo": "DEVELOPMENT_BOARD_ID"
  }
]
```

