import { Router } from "express";
import bcrypt from "bcrypt";
import validator from "validator";


const router = Router();


import authService from "../services/authService.js";
import User from "../models/Users.js";

router.get('/register', (req, res)=>{

    res.render('auth/register')
});

router.post('/register',async (req, res)=>{
    
    const {email, password, rePassword} = req.body;

    // Validate email format using validator library 
    if (!validator.isEmail(email)) {
        res.status(400).end();
        
    }

    await authService.register(email, password);

    const token = await authService.login(email, password); // auto log in after registration
    res.cookie('auth', token, {httpOnly: true});

    res.redirect('/'); // redirecting to home screen 
    
});

router.get('/login', (req, res)=>{

    res.render('auth/login');
});

router.post('/login',async (req, res)=>{

    const {email, password} = req.body;

    const token = await authService.login(email, password);
    // token is added to the header thats why the controller is the right place to create it 

    //crating cookie and add token to cookie
    res.cookie('auth', token, {httpOnly: true});

    res.redirect('/');

});

router.get('/logout', (req, res)=>{
    res.clearCookie('auth');
    res.redirect('/');
    // in good authentication system have to be build mechanism to set the token to false or disable it somehow/ token invalidation
});





export default router;