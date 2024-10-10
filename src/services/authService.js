import User from "../models/Users.js";
import bcrypt from "bcrypt";

const register = async (email, password) =>{

    //ToDo: Check first if user exists and then create one

    return User.create({email, password})
    
};

const login = async(email, password)=>{

    const user = await User.findOne({email: email}); // checking if the User exists

    if(!user){
        throw new Error('User does not exist!')
    };

    const isValid = await bcrypt.compare(password, user.password); // compare the pass with hash pass

    if(!isValid){
        throw new Error ('Incorrect password!')
    }


    //ToDo: Return jwt token
};


export default {
    register,
    login
}

