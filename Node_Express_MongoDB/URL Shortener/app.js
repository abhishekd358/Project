// create server
import express from 'express';
import path from 'path';
import { urlDataCreate, redirectToOrignialUrl } from './controllers/urldata.controller.js';
import mongoose from 'mongoose';
import { UrlDb } from './models/urldata.js';



const app = express();

// mongoDB connection 
mongoose.connect('mongodb+srv://<email>:<password>@cluster0.wuxv9he.mongodb.net/', {dbName:'UrlShortenerDB'}).then(()=>console.log('Database Connect Successfully...!!!')).catch((error)=>console.log(error))


// to render the public contents to index.ejs make it statics
app.set('view engine', 'ejs');
app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



app.get('/', (req, res)=>{
    const shortenUrl = ''

    res.render('index.ejs', {shortenUrl})
})

app.post('/', urlDataCreate)

app.get('/:shortCode', redirectToOrignialUrl)



const port = 1200;
app.listen(port, ()=>console.log("Server Runnng On Port",port))