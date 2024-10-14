import { Schema, model, Types } from "mongoose";

import bcrypt from "bcrypt";
import validator from "validator";

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true, // Index = Email (Another DB view per Email) and this email cant come second time ! 
        minlength: [10, "Email is to short! " ], // we can catch the err in the authController and use the err msg
        validate: [/@[A-Za-z0-9]+.[A-Za-z0-9]+$/, "Invalid email address!"]
    },
    password: {
        type: String,
        minlength: [6, "Password is to short! " ],
        validate: [/^[A-Za-z+-9]+$/, "Invalid password characters!"]
    },
     
    
});

userSchema.virtual('rePassword')
    .set(function(value){
        if (value !== this.password){
            throw new Error ("Password mismatch!")
        }
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