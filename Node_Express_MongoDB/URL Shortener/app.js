// create server
import express from 'express';
import path from 'path';

const app = express();
// to render the public contents to index.ejs make it statics
app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.json())


app.get('/', (req, res)=>{
    res.render('index.ejs')
})




const port = 1200;
app.listen(port, ()=>console.log("Server Runnng On Port",port))