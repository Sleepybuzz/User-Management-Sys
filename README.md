# User Management API

Simple RESTful API built with Node.js, Express and MongoDB (Mongoose).  
Protected with Basic Authentication for demonstration purposes.

## Setup
1. Copy `.env.example` to `.env` and edit values (MONGO_URI, BASIC_USER, BASIC_PASS).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The API root: `GET /`  
   Protected endpoints are under `/api/users`.

## Endpoints
- `POST /api/users` — create user `{ name, email, role }`
- `GET /api/users` — list users (supports `?page=` and `?limit=`)
- `GET /api/users/:id` — get single user
- `PUT /api/users/:id` — update user
- `DELETE /api/users/:id` — delete user

Use Basic Auth with the credentials set in your `.env`.

