const express = require('express')
const jwt = require('jsonwebtoken')

const connectToDB = require('./models');
const routes = require('./routes/index');

const app = express()
const PORT = 3000;

connectToDB()

const authenticate = (req, res, next) => {
    console.log(req.path);
    if(req.path === '/api/authentication/login'){
        return next();
    }

    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).send({message: 'No token Provided'});
    }

    jwt.verify(token, 'secretkey', (err) => {
        if(err){
            return res.status(500).send({message: 'Failed to authenticate Token'});
        }
    });
    next();
}

app.use(authenticate);
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Ok',
        statusCode: 200
    })
})

app.get('/health-check', (req, res) => {
    res.json({
        message: 'Server Reachabe'
    })
})

app.use('/api', routes)

app.listen(PORT, (req, res) => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
})