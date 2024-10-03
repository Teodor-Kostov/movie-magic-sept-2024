import Movie from '../models/Movie.js'; // swapping movieData with my model "Movie"

//TODO: Refactor using DB filtration
const getAll = async (filter = {})=> {
    
    let movies =  await Movie.find();

    if(filter.search){
        movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
    };
    if(filter.genre){
        movies = movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
    };
    if(filter.year){
        movies = movies.filter(movie => movie.year === filter.year);
    };
    
    return movies;

};

const create = (movie) => {

   // movie.id = uniqid(); i don't need a ID because mongoose has a unique ID 
   // movie.rating = Number(movie.rating); // parsing the rating to Number  ;; mongoose is smart and converts the string to Number 
           
   //return movieData.create(movie);
   return Movie.create(movie);
};

const getOne = (movieId)=>  Movie.findById(movieId); // taking all the movies

    


export default {
    getAll,
    create,
    getOne,
}