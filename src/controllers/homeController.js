import express from "express";

const router = express.Router(); // no "New"

router.get('/', (req, res)=>{
    res.render('home')
});

export default router;