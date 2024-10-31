// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to handle JSON data
app.use(express.json());
app.use(express.static('public'));

// Function to load entries from file
function loadEntries() {
    try {
        const data = fs.readFileSync('entries.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Function to save entries to file
function saveEntries(entries) {
    fs.writeFileSync('entries.json', JSON.stringify(entries, null, 2));
}

// Endpoint to get all entries
app.get('/entries', (req, res) => {
    const entries = loadEntries();
    res.json(entries);
});

// Endpoint to add a new entry
app.post('/entries', (req, res) => {
    const entries = loadEntries();
    entries.push(req.body.entry);
    saveEntries(entries);
    res.status(201).json({ message: 'Entry added successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
