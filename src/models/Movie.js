import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        minlength: 5,
        validate: [/^[A-Za-z0-9 ]+$/, "Title contains invalid characters" ]  //form beginning to the end must contain A-Za--z0-9 and white space
    },
    genre: {
        type: String,
        required: [true, "Genre is required!"],
        lowercase: true,
        validate: [/^[A-Za-z0-9 ]+$/, "Genre exceeds character limit or contains invalid characters" ]
    },
    director: {
        type: String,
        required: [true, "Director name is required!"],
        minlength: 5,
        validate: [/^[A-Za-z0-9 ]+$/, "Director contains invalid characters" ]

    },
    year: {
        type: Number,
        required: [true, "Year is required!"],
        min: [1900, "Can not add movies before 1900!"],
        max: [2050, "Can not add movies after 2050"]

    },
    rating: {
        type: Number,
       validate: {
        validator: function(value){
            if(this.year >= 2000 ){
                return !!value
            }else{
                return true;
            }
        },
        message: "Movies from 2000 and later must have a rating"
       },
        min: [1, "Rating should be at least 1. "],
        max: [5, "Rating can be maximum 5"]

    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        minlength:[20, "Description mus be at least 20 characters long."],   
        validate: [/^[A-Za-z0-9 ]+$/, "Description contains invalid characters." ]
    },
    imageUrl:  {
        type: String,
        validate: [/^https?:\/\//,"Invalid image url!"]
    },

    casts: [{
        character: String,
        rel: {
            type: Types.ObjectId, // relation with Cast Model
            ref: 'Cast'
        }//, _id: false
    }], owner:{
        type: Types.ObjectId, // relation with User Model   
        ref: 'Users'
    }

});

const Movie = model('Movie', movieSchema);

export default Movie;