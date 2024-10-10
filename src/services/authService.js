import User from "../models/Users.js";
import bcrypt from "bcrypt";

const register = async (email, password) =>{

   


    return User.create({email, password})
    

};


export default {
    register,
}

