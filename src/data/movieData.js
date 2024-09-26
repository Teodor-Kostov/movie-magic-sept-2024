import fs from 'fs/promises';
import path from 'path';
// is we had the "requere importer mode " wo could import the db.json directly... so no need of a read function
const dbPath = path.resolve('./src/db.json');


async function getDb() {
    const jsonResult = await fs.readFile(dbPath, {encoding: "utf-8"}); // reading the data
    const data = JSON.parse(jsonResult);

    return data; 
}

 function saveDb(data){
    return fs.writeFile(dbPath, JSON.stringify(data, {}, 2)); // writing the data to the db

}

async function getAll() { // re save the whole data base

    const db = await getDb();
    
    return db.movies
}

async function create(movieData) {  // getting the new movie and pushing it to the data base(movies) as last

    const db = await getDb();

    db.movies.push(movieData);

    return saveDb(db);


    
}

export default {
    getAll,
    create
}