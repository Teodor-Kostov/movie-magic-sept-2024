import {Router} from "express";

import movieService from "../services/movieService.js";

const router = Router(); // no "New"


router.get('/',async (req, res)=>{
    const movies = await movieService.getAll();

    res.render('home', {movies});
    
    
});

router.get('/about', (req, res)=>{
    res.render('home/about')
});

export default router;