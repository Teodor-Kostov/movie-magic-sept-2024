import { Schema, model, Types } from "mongoose";

const castSchema = new Schema({
    name: String,
    age: Number,
    born: String,
    imageUrl: String,
    movies: [{ type: Types.ObjectId, ref: 'Movie' }]
});

const Cast = model('Cast', castSchema); 

export default Cast;