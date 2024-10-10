import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();


import authService from "../services/authService.js";
import User from "../models/Users.js";

router.get('/register', (req, res)=>{

    res.render('auth/register')
});

router.post('/register',async (req, res)=>{
    
    const {email, password, rePassword} = req.body;

    await authService.register(email, password);

    res.redirect('/auth/login');
    
});

router.get('/login', (req, res)=>{

    res.render('auth/login');
});

router.post('/login',async (req, res)=>{

    const {email, password} = req.body;

    const token = await authService.login(email, password);
    // token is added to the header thats why the controller is the right place to create it 

    //ToDo: Add token to cookie


});





export default router;