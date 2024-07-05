import express from "express";
const app = express()
import bodyParser from "body-parser";
import cors from 'cors';
import path from 'path';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Shop');


const Users = mongoose.model('Users', {
    username: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'saleProducts' }]
}); 
const saleProducts= mongoose.model('saleProducts',{name: String, category: String, price: String, description: String, image: String });

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
                res.send({message: 'User found', token: token, userId: result._id})
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

app.post('/sell', upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const description=req.body.description;
    const image = req.file.path;
    const spdt= new saleProducts({name:name,category:category,price:price,description:description,image:image});
    spdt.save().then(() => {
        res.send({ message: 'saved successfully' })

    }).catch(() => {
        res.send({ message: 'server error' });
    })
})

app.get('/get-product',(req,res)=>{
    saleProducts.find().then((result)=>{
        console.log(result,'user data');
        res.send({products:result})
    }).catch((err)=>{
        console.log(err);
        res.send({message:'server error'})
    })
})

app.post('/like-product',(req,res)=>{
    const productId = req.body.productId;
    const userId = req.body.userId;

    Users.updateOne({_id: userId} , {$addToSet : { likedProducts: productId }} )
    .then(() => { 
        res.send({ message: 'Added to cart successfully' })

    }).catch(() => {
        res.send({ message: 'server error' });
    })
})

app.post('/cart-product',(req,res)=>{
    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
    .then((result) => {
        res.send({ message: 'success', products: result.likedProducts })
    })
    .catch((err) => {
        res.send({ message: 'server err' })
    })

})

app.listen(port, () => {
    console.log('listening on port ${port}')
})
