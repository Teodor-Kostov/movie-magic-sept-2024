import fs from 'fs/promises';
import path from 'path';
// is we had the "requere importer mode " wo could import the db.json directly... so no need of a read function

async function getDb() {
    const dbPath = path.resolve('./src/db.json');
    const jsonResult = await fs.readFile(dbPath, {encoding: "utf-8"});
    const data = JSON.parse(jsonResult);

    return data;
    
}


async function getMovies() {

    const db = await getDb();
    
    return db.movies
}

export default {
    getMovies
}