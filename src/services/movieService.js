import Movie from '../models/Movie.js'; // swapping movieData with my model "Movie"
import Cast from '../models/Cast.js';

//TODO: Filter in DB not in memory
const getAll = (filter = {})=> {
    
    let moviesQuery = Movie.find(); // creating a query

    if(filter.search){
        //moviesQuery = moviesQuery.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        //moviesQuery = moviesQuery.where('title').regex(new RegExp(filter.search, 'i')); or
        moviesQuery.find({title: {$regex: filter.search, $options: 'i'}}); // regEx search lower upper case possibility 
        //moviesQuery.regex('title', new Regexp(filter.search, 'i')) -- both works
    };
    if(filter.genre){
        //moviesQuery = moviesQuery.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
        moviesQuery.find({genre: filter.genre.toLowerCase()});// genre is validated in the model to lower case 
    };
    if(filter.year){
       // moviesQuery = moviesQuery.filter(movie => movie.year === filter.year);
        moviesQuery.find({year: filter.year});


    };
    
    return moviesQuery;

};

const create = (movie) => {

   // movie.id = uniqid(); i don't need a ID because mongoose has a unique ID 
   // movie.rating = Number(movie.rating); // parsing the rating to Number  ;; mongoose is smart and converts the string to Number 
           
   //return movieData.create(movie);
   return Movie.create(movie);
};
 
const getOne = (movieId)=>  Movie.findById(movieId).populate('casts.rel'); // taking all the movies and and search with a curr ID 

const attach = (movieId, castId, character) =>{// relations between models in DB many to many
    
    return Movie.findByIdAndUpdate(movieId, {$push: {casts: {rel: castId, character}}}); // pushing the castId to the curr movie
};

    


export default {
    getAll,
    create,
    getOne,
    attach
}