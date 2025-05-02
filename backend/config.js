const PORT = 3000;

const config = {
    API_BASE_URL: `http://localhost:${PORT}`,
    port: PORT,
    header: {
        'Content-Type': 'application/json',
    },
    debug: true
};

module.exports = config;