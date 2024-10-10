import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    email: String,
    password: String,
    
    
});

const User = model('User', userSchema); 

export default User;