import express from "express";

import homeController from './controllers/homeController.js';

import movieController  from './controllers/movieController.js';
// with module system always the file type ".js"

import castController from './controllers/castController.js';

const router = express.Router();

router.use(homeController);
router.use('/movies',movieController);
router.use('/casts',castController);
router.all('*', (req, res) =>{
    res.render('404');
})

export default router;
