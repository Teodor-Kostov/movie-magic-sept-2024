import express from "express";
import handlebars from "express-handlebars"

import routes from './routes.js';

const app = express();
const port = 5000;

app.engine("hbs", handlebars.engine({
    extname: "hbs",
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));  // middleware to parse the bode from the html form

app.use(routes);


app.listen(port, ()=>console.log(`Server is listening on http://localhost:${port}...`));
