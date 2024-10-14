import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "../lib/jwt.js";
import { JWT_SECRET } from "../config/constants.js";

const register = async (email, password, rePassword) =>{

    //ToDo: Check first if user exists and then create one
    const userCount = await User.countDocuments({email: email});
    
    if(userCount > 0 ){
        throw new Error ("User already exists!");
    }

    return User.create({email, password, rePassword});

    
    
};

const login = async(email, password)=>{

    const user = await User.findOne({email: email}); // checking if the User exists

    if(!user){
        throw new Error('User does not exist!');
    };

    const isValid = await bcrypt.compare(password, user.password); // compare the pass with hash pass

    if(!isValid){
        throw new Error ('Incorrect password!');
    };
    //ToDo: Return jwt token
    const payload = {
        _id: user._id,
        email,
    }
    const token = await jwt.sign(payload,JWT_SECRET, {expiresIn: '1h'});

    return token;
    
    
};


export default {
    register,
    login
}

