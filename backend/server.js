const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task-routes');
const config = require('./config.js');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(config.port, () => {
    console.log(`Server running at ${config.API_BASE_URL}`);
});