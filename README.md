# AI Code Reviewer

A full-stack **MERN + Gemini AI** application that analyzes source code, identifies bugs and potential issues, evaluates time and space complexity, and provides structured improvement suggestions.

Users can register or sign in with Google, submit code for AI analysis, and maintain a history of their previous code reviews.

```text
React (Frontend)
       ↓
Node.js + Express (Backend)
       ↓
Google Gemini API
       ↓
MongoDB
```

All AI requests are handled by the backend, so the Gemini API key is never exposed to the browser.

---

## Features

- Email/password registration and login (JWT-based)
- Google Sign-In (OAuth 2.0) as an alternative login method
- Secure, protected review APIs
- AI-powered code analysis using Google Gemini
- Support for multiple languages: C++, Python, JavaScript, Java, C, Go, TypeScript
- AI-generated score (0–100), bug detection, issue detection, and improvement suggestions
- Time and space complexity analysis
- Review history with delete support
- Dashboard statistics
- Responsive, modern frontend
- MongoDB persistence
- Backend-only AI API communication (key never touches the client)

---

## Technology Stack

| Layer | Stack |
|---|---|
| Frontend | React, Vite, JavaScript, CSS, Axios, `@react-oauth/google` |
| Backend | Node.js, Express.js, JWT, bcryptjs, Mongoose, CORS, dotenv, `google-auth-library` |
| Database | MongoDB |
| AI | Google Gemini API (`@google/genai`) |

---

## Project Structure

```text
AI-Code-Reviewer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── .env.example
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
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── LICENSE
└── README.md
```

---

## Prerequisites

- **Node.js 18+** and **npm**
- **MongoDB** (Community Server, local, or MongoDB Atlas)
- A **Google Gemini API key**
- A **Google OAuth Client ID** (for Google Sign-In)

Verify Node/npm:

```bash
node -v
npm -v
```

---

## Installation

```bash
# Backend
cd AI-Code-Reviewer/backend
npm install

# Frontend (in a separate terminal)
cd AI-Code-Reviewer/frontend
npm install
```

---

## Database Setup (MongoDB)

The project connects to:

```text
mongodb://127.0.0.1:27017/ai-code-reviewer
```

The database is created automatically on first write. If running MongoDB locally as a service, confirm it's active:

```powershell
Get-Service MongoDB
```

You can inspect the data visually with **MongoDB Compass**, connecting to `mongodb://127.0.0.1:27017`.

If using **MongoDB Atlas** instead, just replace `MONGO_URI` in `backend/.env` with your Atlas connection string.

---

## Getting a Gemini API Key

Create a key via Google's Gemini/AI developer platform, then place it in `backend/.env` as `AI_API_KEY`. Keep this key private — never commit it or use it in frontend code.

---

## Setting Up Google Sign-In

Google Sign-In is optional but enabled by default. To get it working:

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Go to **APIs & Services → OAuth consent screen** and configure it (External type, app name, support email).
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth Client ID**.
5. Choose **Web application** as the type.
6. Under **Authorized JavaScript origins**, add:
   - `http://localhost:5173` (dev)
   - your production frontend URL, once deployed
7. Save and copy the generated **Client ID** — you do not need the client secret for this flow.
8. Add the Client ID to **both**:
   - `backend/.env` as `GOOGLE_CLIENT_ID`
   - `frontend/.env` as `VITE_GOOGLE_CLIENT_ID`
9. Restart both servers after editing `.env` files.

---

## Environment Variables

### `backend/.env`

```env
MONGO_URI=mongodb://127.0.0.1:27017/ai-code-reviewer
JWT_SECRET=replace-this-with-a-long-random-secret
AI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
PORT=5000
CLIENT_URL=http://localhost:5173
```

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `AI_API_KEY` | Google Gemini API key |
| `GOOGLE_CLIENT_ID` | OAuth Client ID used to verify Google Sign-In tokens |
| `PORT` | Backend server port |
| `CLIENT_URL` | Frontend URL, used for CORS |

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### Important

- Do not commit real `.env` files. Ensure `.gitignore` includes:
  ```text
  .env
  .env.*
  ```
- If you keep an `.env.example`, use placeholders only:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  AI_API_KEY=your_gemini_api_key
  GOOGLE_CLIENT_ID=your_google_oauth_client_id
  PORT=5000
  CLIENT_URL=http://localhost:5173
  ```

---

## Running the App

**Backend:**

```bash
cd AI-Code-Reviewer/backend
npm run dev
```

Expected output includes:

```text
Gemini API key loaded: XXXXXXXX... (first 8 characters shown for verification)
Server running on http://localhost:5000
MongoDB connected: 127.0.0.1
```

Verify at `http://localhost:5000` — you should see:

```json
{ "status": "ok", "message": "AI Code Reviewer API is running" }
```

**Frontend:**

```bash
cd AI-Code-Reviewer/frontend
npm run dev
```

Open `http://localhost:5173`.

---

## How to Use

1. **Register or Sign In** — create an account with email/password, or use the **Sign in with Google** button.
2. **Open the Dashboard** and select a programming language.
3. **Paste your code** into the editor.
4. Click **Analyze Code**.
5. View the AI-generated **score, summary, bugs, issues, suggestions, and time/space complexity**.
6. Revisit or delete past analyses from **Review History**.

Request flow:

```text
Frontend → Express API → Authentication → Gemini AI → Structured JSON review → MongoDB → Frontend
```

---

## AI Review Scoring

The AI is instructed to avoid inventing problems and to distinguish real defects from optional style preferences.

| Score | Meaning |
|---|---|
| 100 | Correct, reliable, efficient, no meaningful problems |
| 90–99 | Correct, only minor non-critical improvements |
| 75–89 | Correct but has a meaningful inefficiency or design limitation |
| 60–74 | Real problem exists, but code is still mostly functional |
| 30–59 | Significant correctness, runtime, memory, or algorithmic problems |
| 0–29 | Fundamentally broken or unsafe |

A fully correct program can and should receive **100/100**.

---

## API Reference

| Method | Route | Auth required | Description |
|---|---|:---:|---|
| POST | `/api/auth/register` | No | Create an account |
| POST | `/api/auth/login` | No | Login and receive JWT |
| POST | `/api/auth/google` | No | Login/register via Google ID token |
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

## Troubleshooting

**MongoDB connection error** — confirm MongoDB is running (`Get-Service MongoDB` on Windows) and `MONGO_URI` is correct.

**"Gemini API key loaded: NO KEY"** — check `AI_API_KEY` in `backend/.env`, then restart the backend.

**"API key not valid"** — recheck the key for typos, stray quotes, or spaces, and restart the backend.

**Gemini quota exceeded (`429 RESOURCE_EXHAUSTED`)** — you've hit the Gemini free-tier or project quota; wait for reset or use a project with available quota.

**CORS error** — confirm `CLIENT_URL` in `backend/.env` matches the actual frontend URL/port.

**401 Unauthorized** — your JWT expired or local storage was cleared; log in again.

**Google Sign-In fails / invalid token** — confirm `GOOGLE_CLIENT_ID` matches in both `.env` files, that your frontend's origin is listed under Authorized JavaScript origins in Google Cloud Console, and restart both servers after any `.env` change.

**Frontend can't reach backend** — check `VITE_API_URL` and confirm the backend is running.

---

## Production Build

```bash
cd AI-Code-Reviewer/frontend
npm run build
```

Output is generated in `frontend/dist/`. For deployment, set environment variables through your hosting provider rather than committing `.env` files.

---

## Security Notes

- Never expose `AI_API_KEY` to the frontend.
- Never commit real `.env` files.
- Use a strong, random `JWT_SECRET`.
- Restrict MongoDB network access in production.
- Use HTTPS in production.
- Keep database credentials out of client-side code.

---

## Future Improvements

- Code syntax highlighting improvements
- Additional AI providers
- Streaming AI responses
- More programming languages
- Code diff visualization
- Export reviews as PDF
- Review search and filtering
- Advanced analytics
- Automated test-case generation
- GitHub repository integration
- CI/CD deployment

---

## Author

**Arnav Mishra**
IIT Bhilai

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built with **React, Node.js, Express.js, MongoDB, and Google Gemini AI**.