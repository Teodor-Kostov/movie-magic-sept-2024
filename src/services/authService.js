import User from "../models/Users.js";

const register = (email, password) =>{

    return User.create({email, password})
    
    

};


export default {
    register,
}

