import express from "express";

const router = express.Router(); // no "New"

router.get('/', (req, res)=>{
    res.render('home')
});

router.get('/about', (req, res)=>{
    res.render('home/about')
});

export default router;