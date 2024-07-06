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
    email: String,
    mobile: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'saleProducts' }]
}); 
const saleProducts= mongoose.model('saleProducts',{
    name: String, 
    category: String, 
    price: String, 
    description: String, 
    image1: String,
    image2: String,
    addedBy: mongoose.Schema.Types.ObjectId 
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const user = new Users({ username: username, email, mobile, password: password });
    user.save()
    .then(() => {
        res.send({message: 'saved successfully'})
    })
    .catch(() => {
        res.send({message: 'server error'});
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    Users.findOne({ username: username})
    .then((result) => {
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

app.get('/get-user/:uId', (req, res) => {
    const userId = req.params.uId;
    Users.findOne({ _id : userId})
    .then((result) => {
        res.send({message: 'success', user :result})
    })
    .catch(() => {
        res.send({message: 'server error'});
    })
})


app.post('/sell', upload.fields([{name: 'image1'}, {name: 'image2'}]), (req, res) => {
    // console.log(req.files);
    // console.log(req.body);
    // return;
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const description=req.body.description;
    const image1 = req.files.image1[0].path;
    const image2 = req.files.image2[0].path;
    const addedBy = req.body.userId;
    const spdt= new saleProducts({name:name,category:category,price:price,description:description,image1, image2, addedBy:addedBy});
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


app.post('/dislike-product',(req,res)=>{
    const productId = req.body.productId;
    const userId = req.body.userId;

    Users.updateOne({_id: userId} , {$pull : { likedProducts: productId }} )
    .then(() => { 
        res.send({ message: 'Removed from cart' })

    }).catch(() => {
        res.send({ message: 'server error' });
    })
})


app.get('/product/:id',(req,res)=>{
    saleProducts.findOne({_id : req.params.id}).then((result)=>{
        res.send({message: 'success', product:result})
    }).catch((err)=>{
        console.log(err);
        res.send({message:'server error'})
    })
})

app.get('/profile/:id',(req,res)=>{
    const uid=req.params.id;
    Users.findOne({_id : uid})
    .then((result)=>{
        res.send({message: 'success', user:{email: result.email, mobile: result.mobile, username: result.username}})
    }).catch((err)=>{
        console.log(err);
        res.send({message:'server error'})
    })
})

// app.post('/editprofile/:id',(req,res)=>{
//     const uid=req.params.id;
//     const username = req.body.username;
//     const email = req.body.email;
//     const mobile = req.body.mobile;
//     Users.findOneAndUpdate({_id : uid})
//     .then((result)=>{
//         res.send({message: 'success', user:{email: email, mobile: mobile, username: username}})
//         // res.send({message: 'success', user:{email: result.email, mobile: result.mobile, username: result.username}})
//     }).catch((err)=>{
//         console.log(err);
//         res.send({message:'server error'})
//     })
// })

app.post('/cart-product',(req,res)=>{
    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
    .then((result) => {
        res.send({ message: 'success', products: result.likedProducts })
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:'server error'})
    })
})

app.post('/my-products',(req,res)=>{
    const userId = req.body.userId;
    saleProducts.find({addedBy : userId})
    .then((result) => {
        res.send({ message: 'success', products: result })
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:'server error'})
    })
})

app.listen(port, () => {
    console.log('listening on port ${port}')
})
