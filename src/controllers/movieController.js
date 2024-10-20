import { Router } from "express"; // import the router
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMidleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const  router = Router(); //Creating the router instance

//Deprecated
function toArray(documents){
    return documents.map(document => document.toObject()); // im converting the document to an Obj . Because Movies gives us document not Obj.
}

// URL: movies/create  --> im using modular router thats y the url is striped here and at router.js
router.get('/create',isAuth , (req, res)=>{
    res.render('movies/create');

});

// by removing the action="#"  from create.hbs- form i'm getting the default action /movies/create
router.post('/create',isAuth ,async (req, res) =>{

    const movieData = req.body;

    const ownerId = req.user?._id; // since i have the user who is creating the movie form the authMiddleware i can use it everywhere 

    //TODO: save movie data 
    try {
        await movieService.create(movieData, ownerId);
    } catch(err){
        // Challenge: Show multi errors

        //console.dir(Object.values(err.errors)[0]?.message); // Always gives me the first error msg
        //const errMsgs = Object.values(err.errors).map(error => error.message);  This gives me all the err msgs
        //const errorMessage = Object.values(err.errors)[0]?.message; 
        const errorMessage = getErrorMessage(err);



        
        return res.render('movies/create', {error: errorMessage, movie: movieData}); // returning the same page to show the err msg and also the previous 
        // movie data to not reset the form in every error (bad user experience )
    };

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
    
    const isOwner = req.user?._id === movie.owner?.toString(); // fixing the case when is no owner "?" with optional chaining
    
    
    

    res.render('movies/details', {movie, isOwner });
});

router.get('/:movieId/attach', isAuth,  async(req, res)=>{

    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAllWithout(movie.casts).lean();


    res.render('movies/attach', {movie, casts});
});

router.post('/:movieId/attach',isAuth,  async (req, res)=>{
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const character = req.body.character;

    
     await movieService.attach(movieId, castId, character);

    res.redirect(`/movies/${movieId}/details`);

});

router.get('/:movieId/delete',isAuth,  async(req,res)=>{
    const movieId = req.params.movieId;

    // Check if owner 
    const movie = await movieService.getOne(movieId).lean();
    if(movie.owner.toString() !== req.user._id){
        const errorMessage = 'You are not able to delete this movie!'; 
          return res.render('404', {error: errorMessage});

    }

    await movieService.remove(movieId);

    res.redirect('/');

});

router.get('/:movieId/edit',isAuth,  async(req, res)=>{

    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    
    res.render('movies/edit', {movie})

});;

router.post('/:movieId/edit',isAuth, async (req, res)=>{
    const movieId = req.params.movieId;
    const movieData = req.body;

    await movieService.updateMovie(movieId, movieData);
    res.redirect(`/movies/${movieId}/details`)
});


export default router;