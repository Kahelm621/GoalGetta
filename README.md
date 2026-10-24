# GoalGetta

A simple to-do list app with a React Native front end and a Node.js/Express back end.

## Features
- Task creation
- Task management
- Priority levels
- Due date reminders
- Task completion
- Search functionality
- Filtering and sorting

Back-end routes for tasks (create, list, update, delete) require a JWT token sent in the `x-auth-token` header, and users can only change their own tasks.

## Tech Stack
- **Front end:** React Native, axios, AsyncStorage
- **Back end:** Node.js, Express, MongoDB with Mongoose, JSON Web Tokens, bcryptjs

## How to Run the Back End
```bash
git clone https://github.com/Kahelm621/GoalGetta.git
cd GoalGetta/goalgetta-backend
npm install
# Copy .env.example to .env, then set DB_URL, JWT_SECRET and optionally PORT
node app.js
```

## Project Structure
```
GoalGetta/
├── Screen/               # Home, Login, Register and Task Detail screens
├── components/           # Task item, API service and helpers
└── goalgetta-backend/
    ├── app.js            # Express server
    ├── routes/           # auth and tasks routes
    ├── models/           # Task and User models
    └── config.js
```

> This is a learning project and a work in progress.
