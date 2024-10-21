const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb+srv://lonewolfazharul:NLSBS7UGSqWICNMh@cluster0.juvxx.mongodb.net/myDatabaseName?retryWrites=true&w=majority&tls=true';
const dbName = 'examsystem';
const collectionName = 'data';

async function insertData() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Read data from data.json
        const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

        const collection = client.db(dbName).collection(collectionName);

        // Insert each array in the data object separately
        const adminResult = await collection.insertMany(data.admin.map(admin => ({ ...admin })));
        console.log(`Admin data inserted with IDs: ${adminResult.insertedIds}`);

        const subjectResult = await collection.insertMany(data.subject.map(subject => ({ ...subject })));
        console.log(`Subject data inserted with IDs: ${subjectResult.insertedIds}`);

        const examResult = await collection.insertMany(data.Exam.map(exam => ({ ...exam })));
        console.log(`Exam data inserted with IDs: ${examResult.insertedIds}`);

        const questionResult = await collection.insertMany(data.question.map(question => ({ ...question })));
        console.log(`Question data inserted with IDs: ${questionResult.insertedIds}`);

        const resultResult = await collection.insertMany(data.result.map(result => ({ ...result })));
        console.log(`Result data inserted with IDs: ${resultResult.insertedIds}`);

        const userResult = await collection.insertMany(data.user.map(user => ({ ...user })));
        console.log(`User data inserted with IDs: ${userResult.insertedIds}`);

    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

insertData().catch(console.error);
