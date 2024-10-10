import { Router } from "express"; // import the router
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const  router = Router(); //Creating the router instance

//Deprecated
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
    const movies = await movieService.getAll(query).lean()
    

    res.render('home', {isSearch: true, movies, query});

});


  // its better to use "GET" method. I#m using the search query  from (req.query)  
    
    
    //req.body ---> by POST 
    //req.params ---> reading the URL parameters // id...etc.
    //req.query --->
 

router.get('/:movieId/details',async (req, res) =>{
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();//lean() used over a query is giving us a pure objects instead of document! 

    //const casts = await castService.getAllWithout(movie.casts).lean(); // with lean i'm converting the document to js object and HBS does not throw an error

    res.render('movies/details', {movie});
});

router.get('/:movieId/attach', async(req, res)=>{

    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAllWithout(movie.casts).lean();


    res.render('movies/attach', {movie, casts});
});

router.post('/:movieId/attach',async (req, res)=>{
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const character = req.body.character;

    
     await movieService.attach(movieId, castId, character);

    res.redirect(`/movies/${movieId}/details`);

});


export default router;