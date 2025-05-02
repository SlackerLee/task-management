// Import configuration
import config from './config.js';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasks');
const showAllBtn = document.getElementById('showAll');
const showPendingBtn = document.getElementById('showPending');
const showCompletedBtn = document.getElementById('showCompleted');

let currentFilter = 'all';

// Event Listeners
taskForm.addEventListener('submit', handleTaskSubmit);
showAllBtn.addEventListener('click', () => setFilter('all'));
showPendingBtn.addEventListener('click', () => setFilter('pending'));
showCompletedBtn.addEventListener('click', () => setFilter('completed'));

// Initialize
fetchTasks();

// Functions
async function fetchTasks() {
    try {
        const response = await fetch(`${config.API_BASE_URL}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        showError('Failed to load tasks. Please try again later.');
    }
}

async function handleTaskSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    
    try {
        const response = await fetch(`${config.API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: config.header,
            body: JSON.stringify({ title, description }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create task');
        }
        
        const newTask = await response.json();
        taskForm.reset();
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error creating task:', error);
        showError(error.message);
    }
}

async function toggleTaskStatus(taskId, currentStatus) {
    try {
        const response = await fetch(`${config.API_BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: config.header,
            body: JSON.stringify({ completed: !currentStatus }),
        });
        
        if (!response.ok) throw new Error('Failed to update task status');
        
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error updating task:', error);
        showError('Failed to update task status. Please try again.');
    }
}

async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const response = await fetch(`${config.API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete task');
        
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error deleting task:', error);
        showError('Failed to delete task. Please try again.');
    }
}

function displayTasks(tasks) {
    tasksContainer.innerHTML = '';
    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'pending') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
    });
    
    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = '<p class="no-tasks">No tasks found</p>';
        return;
    }
    
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <div class="task-info">
                <h3 class="task-title">Task: ${task.title}</h3>
                <p class="task-description">Description: ${task.description}</p>
                <p class="task-description">Status: ${task.completed ? 'Completed' : 'Pending'}</p>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="window.toggleTaskStatus(${task.id}, ${task.completed})">
                    ${task.completed ? 'Reopen' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="window.deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        tasksContainer.appendChild(taskElement);
    });
}

function setFilter(filter) {
    currentFilter = filter;
    
    // Update active button state
    [showAllBtn, showPendingBtn, showCompletedBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`show${filter.charAt(0).toUpperCase() + filter.slice(1)}`).classList.add('active');
    
    fetchTasks();
}

function showError(message) {
    // You could implement a more sophisticated error display system here
    alert(message);
}

// Make functions available globally
window.toggleTaskStatus = toggleTaskStatus;
window.deleteTask = deleteTask; 