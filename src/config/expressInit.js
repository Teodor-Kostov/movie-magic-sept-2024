import express from 'express';

import cookieParser from "cookie-parser";

import { authMiddleware } from '../middlewares/authMidleware.js';

export default function expressInit(app){

    
    app.use(express.urlencoded({extended: false}));
    app.use(express.static('public'));  // middleware to parse the bode from the html form
    app.use(cookieParser());
    app.use(authMiddleware);
};