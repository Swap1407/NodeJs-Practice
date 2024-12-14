const mongoose = require('mongoose')

const connectToDB = () => {

    mongoose.connect('mongodb://localhost:27017/training')

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error('Connection Error: ', err);
    })

    db.on('open', () => {
        console.log('Connected to DB');
    })
}

module.exports = connectToDB