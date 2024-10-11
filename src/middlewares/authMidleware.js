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
       console.log(decodedToken);
       

       //ToDo: Add user data to req
       req.user = {
        _id: decodedToken._id,
        email: decodedToken.email
       };

       return next();

    }catch(err){
        res.clearCookie('auth');
        res.redirect('/auth/login')

        //ToDo: if throws an error... that means that the token is invalid (expired etc.)
        

    }

    




    // ToDo: Add user data to request
}   
