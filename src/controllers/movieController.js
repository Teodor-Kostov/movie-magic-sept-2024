import { Router } from "express"; // import the router

const  router = Router(); //Creating the router instance
// URL: movies/create  --> im using modular router thats y the url is striped here and at router.js
router.get('/create', (req, res)=>{
    res.render('movies/create');

});

export default router;