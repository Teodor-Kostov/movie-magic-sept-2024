import express from "express";

import homeController from './controllers/homeController.js' 
// with module system always the file type ".js"

const router = express.Router();

router.use(homeController);

export default router;
