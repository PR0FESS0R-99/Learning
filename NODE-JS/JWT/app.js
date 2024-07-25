const express = require('express')
var jwt = require('jsonwebtoken')
var cors = require('cors')
var mongoose = require('mongoose');
var l = require('./userModel');
const userModel = require('./userModel');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/jwt')

// MiddleWare
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.json({ erroe: 'no token provided' });
    }
    let token = authHeader.split(' ').pop();
    jwt.verify(token, 'secretCode', (err, decoded) => {
        if (err) {
            res.json({ error: 'Authatication Failed' });
        } else {
            next()
        }
    })
}

// Routers
app.post('/login', async (req, res) => {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;


    let isUser = await userModel.findOne({ username: username })
    if (isUser) {
        let rep = {
            id: isUser._id,
            username: username,
        }

        let token = jwt.sign(rep, 'secretCode', { expiresIn: 86400 })
        res.json({ auth: true, token })
    }
});

app.post('/register', async (req, res) => {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;

    if (! await userModel.findOne({ username: username })) {
        await userModel.create({ username, password });
        let token = jwt.sign(rep, 'secretCode', { expiresIn: 86400 })

        res.json({ text: 'Success', token })
    } else {
        res.json({ text: 'Failed' })
    };
})

app.get('/admin', verifyToken, (req, res) => {
    res.json({ success: 'done' })
})


app.listen(3000, () => {
    console.log('Server Started...');
})