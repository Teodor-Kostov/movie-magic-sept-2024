import { Router } from "express"; // import the router
import movieService from "../services/movieService.js";

const  router = Router(); //Creating the router instance

function toArray(documents){
    return documents.map(document => document.toObject()); // im converting the document to an Obj . Because Movies gives us document not Obj.
}

// URL: movies/create  --> im using modular router thats y the url is striped here and at router.js
router.get('/create', (req, res)=>{
    res.render('movies/create');

});

// by removing the action="#"  from create.hbs- form i'm getting the default action /movies/create
router.post('/create', (req, res) =>{

    const movieData = req.body;

    //TODO: save movie data 
    movieService.create(movieData);

    //console.log(req.body); here i'm using the urlencoded middleware to pars the body of the form in index.js
    res.redirect('/'); // redirecting to home screen
   
})
router.get('/search',async (req,res)=>{
    const query = req.query; //{ search: 'Home Alone', genre: 'action', year: '1991' }
    const movies = await movieService.getAll(query)
    

    res.render('home', {isSearch: true, movies: toArray(movies), query});

});


  // its better to use "GET" method. I#m using the search query  from (req.query)  
    
    
    //req.body ---> by POST 
    //req.params ---> reading the URL parameters // id...etc.
    //req.query --->
 

router.get('/:movieId/details',async (req, res) =>{

    const movieId = req.params.movieId;
    
    const movie = await movieService.getOne(movieId).lean();//lean() used over a query is giving us a pure objects instead of document! 

    // prepare view data
    movie.ratingView = getRatingViewData(movie.rating); // fixing the data to the movie obj and  place in the rating template {{movie.ratingView}}

    res.render('movies/details', {movie});
});

function getRatingViewData(rating){
    if(!Number.isInteger(rating)){
        return 'N/A';
    }

    return '&#x2605;'.repeat(rating);
}
export default router;