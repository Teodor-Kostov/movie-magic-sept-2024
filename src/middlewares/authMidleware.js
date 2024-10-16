//import jwt from "jsonwebtoken";
import jwt from '../lib/jwt.js';
import { JWT_SECRET } from "../config/constants.js";

export const authMiddleware = async (req, res, next) =>{
    //ToDo: Check if there is a token in the request
    const token = req.cookies['auth']; // thats the cookie name where we can search for token
    if(!token){
        return next();
    };
    //ToDo: Validate the token
    try{
       const decodedToken = await jwt.verify(token, JWT_SECRET);
       
       //ToDo: Add user data to req
        const user = {
        _id: decodedToken._id,
        email: decodedToken.email
       };
       req.user = user;
       req.isAuthenticated = true; 
       res.locals.userId = user._id; // saving user data in the current req/res session
       res.locals.userEmail = user.email;
       res.locals.isAuthenticated = true; // if goes here is always true 

       return next();

    }catch(err){
        res.clearCookie('auth');
        res.redirect('/auth/login')

        //ToDo: if throws an error... that means that the token is invalid (expired etc.)
    }
    // ToDo: Add user data to request
};

export const isAuth = (req, res, next) => {  // passing the function everyway where is needed a authentication check (create, attach, edit..)
    
    if (!req.isAuthenticated ){
        return res.redirect('/auth/login');
    };
    return next();
}
