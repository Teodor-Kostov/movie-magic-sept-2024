import { Router } from "express";
const router = Router();

import authService from "../services/authService.js";

router.get('/register', (req, res)=>{

    res.render('auth/register')
});

router.post('/register',async (req, res)=>{
    
    const {email, password, rePassword} = req.body;

    await authService.register(email, password);

    res.redirect('/auth/login');
    
})





export default router;