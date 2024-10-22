// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const { Db } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to read db.json
const readDatabase = () => {
    const data = fs.readFileSync('db.json');
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

// GET API to fetch a subject by ID
app.get('/subject/:id', (req, res) => {
    const db = readDatabase(); // Read the database (or your JSON file)
    const subjectId = req.params.id;

    // Find the subject by its ID
    const subject = db.subject.find((subject) => subject.id == subjectId);

    // If subject not found, return a 404 status
    if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
    }

    // If subject found, return it
    res.json(subject);
});


app.post('/subject', (req, res) => {
    const db = readDatabase();
    db.subject.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// DELETE API to delete a subject by ID
app.delete('/subject/:id', (req, res) => {
    const subjectId = req.params.id;

    // Read the database
    const db = readDatabase();

    // Find the index of the subject by ID
    const subjectIndex = db.subject.findIndex((subject) => subject.id == subjectId);

    if (subjectIndex === -1) {
        return res.status(404).json({ message: 'Subject not found' });
    }

    // Remove the subject from the db.subject array
    db.subject.splice(subjectIndex, 1);

    // Write the updated database back
    writeDatabase(db);

    res.json({ message: `Subject with ID ${subjectId} deleted successfully` });
});



// CRUD Routes for Exam
app.get('/exam', (req, res) => {
    const db = readDatabase();
    res.json(db.Exam);
});

// Get Exam by ID
app.get('/exam/:id', (req, res) => {
    try {
        const examId = req.params.id; // Get the ID from the URL
        const db = readDatabase(); // Read the database to get the latest data
        const exam = db.Exam.find(e => e.id == parseInt(examId)); // Find the exam by ID

        console.log(`Fetching exam with ID: ${examId}`); // Debugging log
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/exam', (req, res) => {
    const db = readDatabase();
    db.Exam.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// CRUD Routes for Question
// CRUD Routes for Question
app.get('/question', (req, res) => {
    const db = readDatabase();
    res.json(db.question);
});

app.get('/question/:id', (req, res) => {
    try {
        const questionId = req.params.id; // Get the ID from the URL
        const db = readDatabase(); // Read the database again to get the latest data
        // Ensure you compare strings to strings or numbers to numbers
        const question = db.question.find(q => q.id === questionId); // Find the question by ID

        console.log("Fetching question with ID:", questionId); // Debugging log
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        console.error("Error fetching question:", error); // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});



app.post('/question', (req, res) => {
    const db = readDatabase();
    db.question.push(req.body);
    writeDatabase(db);
    res.status(201).json(req.body);
});

// Update Question
app.put('/question/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const db = readDatabase();
    const index = db.question.findIndex(q => q.id == parseInt(id));
    if (index !== -1) {
        db.question[index] = { ...db.question[index], ...req.body };
        writeDatabase(db);
        res.status(200).json(db.question[index]);
    } else {
        res.status(404).send("Question not found.");
    }
});

// Delete Question
app.delete('/question/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const db = readDatabase();
    const index = db.question.findIndex(q => q.id == parseInt(id));
    if (index !== -1) {
        db.question.splice(index, 1);
        writeDatabase(db);
        res.status(204).send(); // No Content
    } else {
        res.status(404).send("Question not found.");
    }
});


// CRUD Routes for Result
app.get('/result', (req, res) => {
    const db = readDatabase();
    res.json(db.result);
});

// Get Result by ID
// app.get('/result/:id', (req, res) => {
//     try {
//         const resultId = req.params.id; // Get the ID from the URL
//         const db = readDatabase(); // Read the database to get the latest data
//         const result = db.result.find(r => r.id == (resultId)); // Find the result by ID

//         console.log(`Fetching result with ID: ${resultId}`); // Debugging log
//         if (!result) {
//             return res.status(404).json({ message: 'Result not found' });
//         }
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// Get results by user email
app.get('/result/email/:email', (req, res) => {
    const email = req.params.email; // Get the email from the URL params
    const db = readDatabase(); // Read the database

    // Find results matching the email
    const filteredResults = db.result.filter(result => result.user_email === email);

    if (filteredResults.length > 0) {
        res.json(filteredResults);
    } else {
        res.status(404).json({ message: 'No results found for this email' });
    }
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

// Fetch a user by ID
app.get('/user/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id); // Get the ID from the URL
        const db = readDatabase(); // Read the database again to get the latest data
        const user = db.user.find(u => u.id == userId); // Find the user by ID

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
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
