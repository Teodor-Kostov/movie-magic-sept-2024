import uniqid from 'uniqid'; // library for generating a unique ID 


import movieData from "../data/movieData.js";

const getAll = ()=> movieData.getAll();

const create = (movie) => {

    movie.id = uniqid();
    movie.rating = Number(movie.rating); // parsing the rating to Number 
        
    
    
   
   return movieData.create(movie);
};

const getOne = async (movieId)=>{

    const movies = await movieData.getAll(); // taking all the movies

    const resultMovie =  movies.find(movie => movie.id == movieId); // filtering the movies with the actual Id 


    return resultMovie; // returning the wished movie
}

export default {
    getAll,
    create,
    getOne,
}