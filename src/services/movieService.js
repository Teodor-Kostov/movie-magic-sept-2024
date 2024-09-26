import uniqid from 'uniqid'; // library for generating a unique ID 


import movieData from "../data/movieData.js";

const getAll = ()=> movieData.getAll();

const create = (movie) => {

    movie.id = uniqid();
    
   
   return movieData.create(movie);
};

export default {
    getAll,
    create
}