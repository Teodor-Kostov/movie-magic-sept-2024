import {Router} from "express";

import movieService from "../services/movieService.js";

const router = Router(); // no "New"
// Temp solution 
//function toArray(documents){
//    return documents.map(document => document.toObject()); // im converting the document to an Obj . Because Movies gives us document not Obj.
//}

router.get('/',async (req, res)=>{
    const movies = await movieService.getAll().lean();

    res.render('home', {movies});
    
    
});

router.get('/about', (req, res)=>{
    res.render('home/about')
});

export default router;