import { Router } from "express";


const router = Router();

router.get('/create', (req, res)=>{
    res.render('casts/create')
});

export default router;