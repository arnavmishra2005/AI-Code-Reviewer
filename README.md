# AI Code Reviewer

A full-stack **MERN + Gemini AI** application that lets a logged-in user paste code, select a programming language, and receive an intelligent code review.

The application analyzes code for:

- Overall code quality score
- Bugs and correctness issues
- Code-quality and design issues
- Practical suggestions
- Time complexity
- Space complexity
- Detailed explanation

All AI requests are handled by the backend, so the Gemini API key is never exposed to the browser.

```text
React (Frontend)
       ↓
Node.js + Express (Backend)
       ↓
Google Gemini API
       ↓
MongoDB
```

> **Built by Arnav Mishra — IIT Bhilai**

---

## 1. Features

- User registration and login
- JWT-based authentication
- Secure protected review APIs
- AI-powered code analysis using Google Gemini
- Support for multiple programming languages:
  - C++
  - Python
  - JavaScript
  - Java
  - C
  - Go
  - TypeScript
- AI-generated score from 0–100
- Bug detection
- Code-quality issue detection
- Improvement suggestions
- Time and space complexity analysis
- Review history
- Delete previous reviews
- Dashboard statistics
- Responsive and modern frontend
- MongoDB persistence
- Backend-only AI API communication

---

## 2. Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Axios

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Mongoose
- CORS
- dotenv

### Database

- MongoDB

### AI

- Google Gemini API
- `@google/generative-ai`

---

## 3. Project Structure

```text
AI-Code-Reviewer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 4. Prerequisites

Install the following before running the project:

- **Node.js 18+**
- **npm**
- **MongoDB Community Server** or MongoDB Atlas
- **Google Gemini API key**

Check Node.js and npm:

```bash
node -v
npm -v
```

Check MongoDB on Windows:

```powershell
mongod --version
```

You can also verify that the MongoDB Windows service is running:

```powershell
Get-Service MongoDB
```

---

## 5. Install Dependencies

Open a terminal in the project directory.

### Backend

```bash
cd AI-Code-Reviewer/backend
npm install
```

### Frontend

Open another terminal:

```bash
cd AI-Code-Reviewer/frontend
npm install
```

---

## 6. Set Up MongoDB

### Option A — Local MongoDB

For local development, MongoDB can run on:

```text
mongodb://127.0.0.1:27017
```

The project uses:

```text
mongodb://127.0.0.1:27017/ai-code-reviewer
```

The `ai-code-reviewer` database will be created automatically when data is first stored.

If MongoDB was installed as a Windows service, it can normally run automatically in the background.

You can verify it with:

```powershell
Get-Service MongoDB
```

Expected result:

```text
Status   Name      DisplayName
------   ----      -----------
Running  MongoDB   MongoDB Server (MongoDB)
```

### MongoDB Compass

MongoDB Compass is a graphical interface for viewing and managing your MongoDB databases.

Connect Compass to:

```text
mongodb://127.0.0.1:27017
```

After registering a user or submitting reviews, the database and collections will appear in Compass.

---

## 7. Get a Google Gemini API Key

This project uses the **Google Gemini API** for code analysis.

Create an API key through Google's Gemini/AI developer platform.

After creating the key, copy it and place it in the backend `.env` file.

> Keep the API key private. Never put it in frontend code or commit it to GitHub.

The application expects the environment variable:

```text
AI_API_KEY=YOUR_GEMINI_API_KEY
```

The backend sends code to Gemini and returns only the structured review result to the frontend.

---

## 8. Configure Backend Environment Variables

Create:

```text
backend/.env
```

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ai-code-reviewer

JWT_SECRET=replace-this-with-a-long-random-secret

AI_API_KEY=YOUR_GEMINI_API_KEY

PORT=5000

CLIENT_URL=http://localhost:5173
```

### Explanation

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `AI_API_KEY` | Google Gemini API key |
| `PORT` | Backend server port |
| `CLIENT_URL` | Frontend URL used for CORS |

### Important

Do not write:

```env
AI_API_KEY=YOUR_GEMINI_API_KEY
```

literally.

Replace it with your actual key:

```env
AI_API_KEY=your_actual_gemini_key_here
```

Also avoid unnecessary spaces around `=`.

---

## 9. Configure Frontend Environment Variables

Create:

```text
frontend/.env
```

Use:

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend uses this URL to communicate with the Express backend.

---

## 10. Never Commit `.env` Files

Your `.env` files contain secrets.

Do not upload them to GitHub.

Make sure `.gitignore` contains:

```text
.env
.env.*
```

If your project uses `.env.example`, it should contain placeholders rather than real keys.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_gemini_api_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

## 11. Run the Backend

Open a terminal:

```bash
cd AI-Code-Reviewer/backend
npm run dev
```

Expected output:

```text
Gemini API key loaded: XXXXXXXX...
Server running on http://localhost:5000
MongoDB connected: 127.0.0.1
```

The exact MongoDB message may vary.

You can test the backend by opening:

```text
http://localhost:5000
```

You should receive:

```json
{
  "status": "ok",
  "message": "AI Code Reviewer API is running"
}
```

---

## 12. Run the Frontend

Open a second terminal:

```bash
cd AI-Code-Reviewer/frontend
npm run dev
```

Vite will normally show:

```text
Local: http://localhost:5173/
```

Open:

```text
http://localhost:5173
```

---

## 13. How to Use the Application

### Step 1 — Register

Create an account using:

- Name
- Email
- Password

### Step 2 — Login

Log into the application.

### Step 3 — Open Dashboard

Select a programming language.

### Step 4 — Enter Code

Paste your code into the editor.

### Step 5 — Analyze

Click:

```text
Analyze Code
```

The request follows this flow:

```text
Frontend
   ↓
Express API
   ↓
Authentication
   ↓
Gemini AI
   ↓
Structured JSON review
   ↓
MongoDB
   ↓
Frontend
```

### Step 6 — View Results

The application displays:

- Score
- Summary
- Bugs
- Issues
- Suggestions
- Time complexity
- Space complexity
- Explanation

### Step 7 — History

Previously generated reviews can be viewed from the History section and deleted when required.

---

## 14. AI Review Scoring

The AI is instructed to avoid inventing problems and to distinguish between actual defects and optional style preferences.

### 100/100

The code is correct, reliable, reasonably efficient, and has no meaningful problems.

### 90–99

The code is correct but has minor improvements that do not affect correctness.

### 75–89

The code works but has meaningful inefficiencies, design problems, or important edge-case limitations.

### 60–74

The code has real problems but is still mostly functional.

### 30–59

The code contains significant correctness, runtime, memory, or algorithmic problems.

### 0–29

The code is fundamentally broken or unsafe.

A correct program is explicitly allowed to receive **100/100**.

---

## 15. API Reference

| Method | Route | Authentication | Description |
|---|---|:---:|---|
| POST | `/api/auth/register` | No | Create an account |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/reviews` | Yes | Analyze submitted code |
| GET | `/api/reviews` | Yes | Get user's review history |
| GET | `/api/reviews/:id` | Yes | Get a specific review |
| DELETE | `/api/reviews/:id` | Yes | Delete a review |

Protected requests use:

```text
Authorization: Bearer <token>
```

---

## 16. Troubleshooting

### MongoDB connection error

Check that MongoDB is running:

```powershell
Get-Service MongoDB
```

If it is stopped, start the MongoDB service.

Also verify:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ai-code-reviewer
```

---

### Gemini API key is not loaded

If the backend prints:

```text
Gemini API key loaded: NO KEY
```

check:

```text
backend/.env
```

Make sure it contains:

```env
AI_API_KEY=your_actual_gemini_key
```

Then stop and restart the backend:

```bash
npm run dev
```

Environment variables are loaded when the Node.js process starts.

---

### Gemini API key is invalid

If you see:

```text
API key not valid
```

check that:

1. The key is copied correctly.
2. The key is in `backend/.env`.
3. The variable name is exactly `AI_API_KEY`.
4. There are no accidental quotes or spaces.
5. The backend was restarted after changing `.env`.

---

### Gemini quota exceeded

The Gemini API has usage limits depending on the model and account/project quota.

A free-tier project may have a limited number of requests.

If the backend returns:

```text
429 RESOURCE_EXHAUSTED
```

the request quota has been reached.

Wait until the quota resets or use an account/project with available quota.

---

### CORS error

Check:

```env
CLIENT_URL=http://localhost:5173
```

and make sure the frontend is actually running on that URL.

If Vite uses another port, update `CLIENT_URL` accordingly.

---

### 401 Unauthorized

Log in again.

The JWT may have expired or local browser storage may have been cleared.

---

### Frontend cannot connect to backend

Check:

```env
VITE_API_URL=http://localhost:5000/api
```

Then make sure the backend is running:

```bash
npm run dev
```

---

## 17. Production Build

Build the frontend:

```bash
cd AI-Code-Reviewer/frontend
npm run build
```

The production files will be generated in:

```text
frontend/dist/
```

For production deployment, configure the same environment variables in the hosting provider rather than committing `.env` files.

---

## 18. Security Notes

- Never expose `AI_API_KEY` to the frontend.
- Never commit real `.env` files.
- Use a strong `JWT_SECRET`.
- Restrict MongoDB network access in production.
- Use HTTPS in production.
- Do not expose database credentials in client-side code.
- Use environment variables for secrets.

---

## 19. Future Improvements

Possible future enhancements include:

- Code syntax highlighting improvements
- More AI providers
- Streaming AI responses
- More programming languages
- Code diff visualization
- Export reviews as PDF
- Review search and filtering
- Advanced analytics
- Automated test-case generation
- GitHub repository integration
- Deployment with CI/CD

---

## 20. Author

### Arnav Mishra

**Indian Institute of Technology Bhilai (IIT Bhilai)**

Full-stack AI-powered software project focused on combining:

- Software development
- Data persistence
- Authentication
- AI-assisted code analysis
- Modern frontend development

---

## 21. Project Summary

**AI Code Reviewer** is a full-stack software engineering project that demonstrates how a modern web application can combine a React frontend, Node.js/Express backend, MongoDB database, JWT authentication, and Google Gemini AI.

The architecture keeps the AI API key on the server while providing users with an interactive platform for analyzing and improving their code.

**Built with React + Node.js + Express + MongoDB + Google Gemini AI.**

**Made by Arnav Mishra — IIT Bhilai.**
