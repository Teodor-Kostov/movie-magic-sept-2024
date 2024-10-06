import Movie from '../models/Movie.js'; // swapping movieData with my model "Movie"
import Cast from '../models/Cast.js';

//TODO: Filter in DB not in memory
const getAll = (filter = {})=> {
    
    let moviesQuery = Movie.find();

    if(filter.search){
        //moviesQuery = moviesQuery.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        //moviesQuery = moviesQuery.where('title').regex(new RegExp(filter.search, 'i')); or
        moviesQuery.find({title: {$regex: filter.search, $options: 'i'}}); // regEx search lower upper case possibility 
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

const getOne = (movieId)=>  Movie.findById(movieId); // taking all the movies and and search with a curr ID 

const attach = async (movieId, castId) =>{// relations between models in DB many to many
    
    try {
        const movie = await Movie.findById(movieId).populate('casts');
        
        if (movie.casts.some(cast => cast._id.toString()=== castId)) {
            console.log('Cast member is already part of the Movie');
            return;
            
        }
        await Movie.findByIdAndUpdate(movieId,{
            $push: {casts: castId}
        });
        // updating also the cast
        await Cast.findByIdAndUpdate(castId, {
            $push: {movies: movieId}
        });
        console.log(`Successfully attached Cast ${castId} to Movie ${movieId}`);
    }catch(error){
        console.log('Error attaching Cast to Movie');
        console.error(error)
    }

};

    


export default {
    getAll,
    create,
    getOne,
    attach
}