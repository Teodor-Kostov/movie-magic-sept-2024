import { Schema, model, Types } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        validate: [/^[A-Za-z0-9 ]+$/, "Name contains invalid characters"]
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    },
    born: {
        type: String,
        validate: [/^[A-Za-z0-9 ]+$/, "Born contains invalid characters"],
        minlength: 10
    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//, "Invalid image url!"]
    },
    movies: [
        {
            type: Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

const Cast = model('Cast', castSchema);

export default Cast;