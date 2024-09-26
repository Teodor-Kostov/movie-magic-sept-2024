import { Router } from "express"; // import the router
import movieService from "../services/movieService.js";

const  router = Router(); //Creating the router instance

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
    res.redirect('/');
    //res.end();
    

})
export default router;