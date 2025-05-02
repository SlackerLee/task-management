const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

let db;

// Initialize database
async function initializeDatabase() {
    db = await sqlite.open({
        filename: './tasks.db',
        driver: sqlite3.Database
    });

    await db.exec(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

// Get all tasks
const getAllTasks = async () => {
    return await db.all('SELECT * FROM tasks ORDER BY created_at DESC');
};

// Create a new task
const createTask = async (title, description) => {
    const result = await db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description]
    );
    
    return {
        id: result.lastID,
        title,
        description,
        completed: false,
        created_at: new Date().toISOString()
    };
};

// Update task status
const updateTaskStatus = async (id, completed) => {
    const result = await db.run(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [completed, id]
    );
    
    if (result.changes === 0) {
        throw new Error('Task not found');
    }
    
    return { id, completed };
};

// Delete a task
const deleteTask = async (id) => {
    const result = await db.run('DELETE FROM tasks WHERE id = ?', [id]);
    
    if (result.changes === 0) {
        throw new Error('Task not found');
    }
};

// Initialize the database
initializeDatabase().catch(console.error);

module.exports = {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTask
}; 