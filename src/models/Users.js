import { Schema, model, Types } from "mongoose";

import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    email: String,
    password: String,
    
    
});
// Hash password before save
userSchema.pre('save', async function(){
    //const salt = await bcrypt.genSalt(10);
    //const hashedPassword =  await bcrypt.hash(this.password, salt); or ->
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;

});

const User = model('User', userSchema); 

export default User;