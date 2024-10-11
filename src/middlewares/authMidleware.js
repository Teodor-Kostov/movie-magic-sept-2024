import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export const authMiddleware =  (req, res, next) =>{
    //ToDo: Check if there is a token in the request
    const token = req.cookies['auth']; // thats the cookie name where we can search for token
    if(!token){
        return next();
    };
    //ToDo: Validate the token
    try{
       const decodedToken =  jwt.verify(token, JWT_SECRET);
       
       

       //ToDo: Add user data to req
        const user = {
        _id: decodedToken._id,
        email: decodedToken.email
       };
       req.user = user;
       res.locals.userId = user._id;
       res.locals.userEmail = user.email;
       res.locals.isAuthenticated = true; // if goes here is always true 

       return next();

    }catch(err){
        res.clearCookie('auth');
        res.redirect('/auth/login')

        //ToDo: if throws an error... that means that the token is invalid (expired etc.)
        

    }

    




    // ToDo: Add user data to request
}   
