# Task Management Application

A simple full-stack task management application with a **Node.js backend** and a **front-end interface**.

## Features
- View a list of tasks
- Add new tasks (title and description required)
- Mark tasks as completed
- Delete tasks

## Backend

### Requirements
- **Express Server** with RESTful endpoints:
  - `GET /tasks` → Retrieve all tasks
  - `POST /tasks` → Create a new task (validate title and description)
  - `PUT /tasks/:id` → Update task status (completed or not)
  - `DELETE /tasks/:id` → Delete a task
- Store tasks in memory (`array`) or use **SQLite** for persistence
- **Input validation:** Ensure title is not empty
- **Error handling:** Respond with appropriate HTTP status codes

## Frontend

### Requirements
- UI to display tasks in a **list or grid**
- **Form** to add new tasks
- **Buttons** to mark tasks as complete or delete them
- Fetch & update tasks via **API calls**
- Show **loading states** during API requests
- Handle errors gracefully (e.g., display messages when server is down)
- **Responsive styling** for a clean user experience

## Bonus Features
- **Sorting** by task status (completed vs. pending)
- **Optimistic updates** (UI updates before API response, with rollback on failure)
- **User authentication** using JWT-based login for task ownership

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo/task-manager.git
   cd task-manager
