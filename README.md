# HN Reader 📰

A full-stack Hacker News reader app that scrapes top stories, supports user authentication, and allows bookmarking your favorite stories.

---

## 🖥️ Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Axios + Cheerio (web scraping)

**Frontend**
- React + Vite
- React Router v6
- Axios
- React Context API
- TailwindCSS

---

## 📁 Folder Structure

```
hn-reader/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── storyController.js
│   │   └── scrapeController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Story.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── storyRoutes.js
│   │   └── scrapeRoutes.js
│   ├── scraper/
│   │   └── hnScraper.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Stories.jsx
    │   │   └── Bookmarks.jsx
    │   ├── components/
    │   │   ├── StoryCard.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## ⚙️ Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local) or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- npm v9 or higher

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/abhiJunior/DACBY.git
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Then open `.env` and fill in your values (see [Environment Variables](#-environment-variables) below).

Start the backend server:

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The backend will start on `http://localhost:5000`.
On startup, it will **automatically scrape the top 10 stories** from Hacker News.

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the backend server runs on | `5000` |
| `DB_PASSWORD` | Mongob password connection string | `1G8GMmZdHbbMVOjt` |
| `JWT_PASSWORD` | Secret key used to sign JWT tokens | `12345678` |
| `JWT_EXPIRY` | Secret key used to sign JWT tokens | `3d` |


**Example `.env` file:**

```env
DB_PASSWORD=1G8GMmZdHbbMVOjt
JWT_PASSWORD=12345678
JWT_EXPIRY=3d
PORT=5000
```

> ⚠️ Never commit your `.env` file to version control. It is already listed in `.gitignore`.

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive JWT token |

**Register request body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Login request body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

---

### Story Routes

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/api/stories` | No | Fetch all stories (sorted by points) |
| GET | `/api/stories?page=1&limit=10` | No | Fetch stories with pagination |
| GET | `/api/stories/:id` | No | Fetch a single story by ID |
| POST | `/api/stories/:id/bookmark` | ✅ Yes | Toggle bookmark on a story |

---

### Scrape Routes

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/api/scrape` | No | Manually trigger a Hacker News scrape |

---

## 🔐 Authentication

This project uses **JWT (JSON Web Tokens)** for authentication.

1. Register or login to receive a token
2. Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_token_here>
```

---

## ✨ Features

- ✅ Scrapes top 10 stories from [Hacker News](https://news.ycombinator.com) on server start
- ✅ Manual scrape trigger via `POST /api/scrape`
- ✅ User registration and login with JWT
- ✅ View all stories sorted by points (descending)
- ✅ Pagination support (`?page=1&limit=10`)
- ✅ Bookmark / unbookmark stories (authenticated users)
- ✅ Protected Bookmarks page
- ✅ Persistent auth state via localStorage

---

## 🧪 Testing the API (Postman / curl)

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get all stories:**
```bash
curl http://localhost:5000/api/stories
```

**Trigger scrape:**
```bash
curl -X POST http://localhost:5000/api/scrape
```

**Toggle bookmark (replace TOKEN and STORY_ID):**
```bash
curl -X POST http://localhost:5000/api/stories/STORY_ID/bookmark \
  -H "Authorization: Bearer TOKEN"
```

---

## 🌐 Deployment (Optional)

### Backend — Render / Railway

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com) or [Railway](https://railway.app)
3. Set the root directory to `backend`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`) in the dashboard

### Frontend — Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Set the root directory to `frontend`
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Update `src/api/axios.js` baseURL to your deployed backend URL

---

## 📝 License

MIT License — feel free to use this project for learning or as a portfolio piece.