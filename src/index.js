import express from "express";

import routes from './routes.js';
import handlebarsInit  from "./config/handlebarsInit.js";
import expressInit from "./config/expressInit.js";

const app = express();
const port = 5000;

handlebarsInit(app);
expressInit(app);



app.use(routes);



app.listen(port, ()=>console.log(`Server is listening on http://localhost:${port}...`));
