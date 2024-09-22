import { log } from "console";
import express from "express";

const app = express();
const port = 5000;


app.get('/', (req, res)=>{
    res.send('<h1>It is working!</h1>');
})

app.listen(port, ()=>console.log(`Server is listening on http://localhost:${port}...`));
