const express = require('express');
const app = express();
const PORT = 4500;

// Middleware to parse JSON requests
app.use(express.json());
// Middleware: Log every request
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Home Route
app.get('/', (req, res) => {
    res.send('<h2>Welcome to my Node.js Express Server!</h2>');
});

// Another GET Route
app.get('/test', (req, res) => {
    res.send('<h2>Testing Route...</h2>');
});



// POST Route with Error Handling
app.post('/data', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required!" });
    }

    res.json({ message: `Hello, ${name}! Your data was received.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
