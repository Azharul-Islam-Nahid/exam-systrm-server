// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to read db.json
const readDatabase = () => {
    const data = fs.readFileSync('db.json');
    console.log(data);
    return JSON.parse(data);
};

// Helper function to write to db.json
const writeDatabase = (data) => {
    fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// CRUD Routes for Admin
app.get('/admin', (req, res) => {
    const db = readDatabase();
    res.json(db.admin);
});

app.post('/admin', (req, res) => {
    const db = readDatabase();
    db.admin.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// CRUD Routes for Subject
app.get('/subject', (req, res) => {
    const db = readDatabase();
    res.json(db.subject);
});

app.post('/subject', (req, res) => {
    const db = readDatabase();
    db.subject.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// CRUD Routes for Exam
app.get('/exam', (req, res) => {
    const db = readDatabase();
    res.json(db.Exam);
});

app.post('/exam', (req, res) => {
    const db = readDatabase();
    db.Exam.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// CRUD Routes for Question
app.get('/question', (req, res) => {
    const db = readDatabase();
    res.json(db.question);
});

app.post('/question', (req, res) => {
    const db = readDatabase();
    db.question.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// CRUD Routes for Result
app.get('/result', (req, res) => {
    const db = readDatabase();
    res.json(db.result);
});

app.post('/result', (req, res) => {
    const db = readDatabase();
    db.result.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// CRUD Routes for User
app.get('/user', (req, res) => {
    const db = readDatabase();
    res.json(db.user);
});

app.post('/user', (req, res) => {
    const db = readDatabase();
    db.user.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
