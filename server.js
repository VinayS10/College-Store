import express from "express";
const app = express()
import bodyParser from "body-parser";
import cors from 'cors';
import jwt from 'jsonwebtoken';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Shop');


const Users = mongoose.model('Users', {username: String, password: String}); 

app.get('/', (req, res) => {
    res.send('Hello, world  !')
})

app.post('/signup', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const user = new Users({ username: username, password: password });
    user.save()
    .then(() => {
        res.send({message: 'saved successfully'})
    })
    .catch(() => {
        res.send({message: 'server error'});
    })
})

app.post('/login', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    Users.findOne({ username: username})
    .then((result) => {
        console.log(result, "user data");
        if(!result) {
            res.send({message: 'user not found'});
        } else {
            if(result.password === password) {
                const token = jwt.sign({
                    data: result
                }, 'KEY', { expiresIn: '1h' });
                res.send({message: 'User found', token: token})
            }
            if (result.password != password) {
                res.send({ message: 'incorrect password' })
            }
        }
        
    })
    .catch(() => {
        res.send({message: 'server error'});
    })
})

app.listen(port, () => {
    console.log('listening on port ${port}')
})
