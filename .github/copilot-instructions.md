# Copilot Instructions for SlackClone

## Project Overview
This is a monorepo for a Slack-like clone with two main components:
- `backend/`: Node.js/Express server, using Mongoose for MongoDB, CORS, and dotenv for environment variables.
- `frontend/`: (currently empty) Intended for the client-side application.

## Architecture & Data Flow
- The backend is structured as a single Express server (`server.js`).
- MongoDB is used for persistent storage, accessed via Mongoose.
- CORS is enabled for cross-origin requests, supporting frontend-backend separation.
- Environment variables are managed with `dotenv`.

## Developer Workflows
- **Install dependencies:**
  - `npm install` (run in `backend/`)
- **Start backend server:**
  - No explicit start script; run `node server.js` (or `npm start` if you add a start script)
- **Testing:**
  - No tests are currently implemented. The `test` script is a placeholder.
- **Environment setup:**
  - Create a `.env` file in `backend/` for secrets and configuration.

## Conventions & Patterns
- Uses ES Modules (`type: module` in `package.json`).
- All backend code currently resides in `server.js`.
- External dependencies: `express`, `mongoose`, `cors`, `dotenv`.
- No custom middleware or advanced routing patterns yet.
- No frontend code or build system is present.

## Integration Points
- Backend expects MongoDB connection via Mongoose (connection details should be in `.env`).
- CORS is enabled for frontend-backend communication.

## Examples
- To add a new API route, extend `server.js` using Express routing:
  ```js
  app.get('/api/example', (req, res) => {
    res.json({ message: 'Hello world' });
  });
  ```
- To use environment variables:
  ```js
  import dotenv from 'dotenv';
  dotenv.config();
  const dbUri = process.env.MONGO_URI;
  ```

## Key Files
- `backend/server.js`: Main backend entry point
- `backend/package.json`: Dependency and script management
- `backend/.env`: (not checked in) for secrets/config

---
If any section is unclear or missing, please provide feedback to improve these instructions.
