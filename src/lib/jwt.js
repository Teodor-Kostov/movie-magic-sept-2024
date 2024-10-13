import jsonwebtoken from "jsonwebtoken"; // making callback asynchronous  function to promise based asynchronous function 

import util from 'util';

/*export const verify = (token, secret, options) =>{ // exporting the function with its 3 params
    const promise = new Promise ((resolve, reject) =>{ // add a promise with the executing function with params (resolve, reject)
        jsonwebtoken.verify(token, secret, options, (err, decoded)=>{ // calling the function with all params and call back function
            if(err){
                return reject(err);
            }
            resolve(decoded);
        });
    });
    return promise; // return the promise
};*/


 const verify = util.promisify(jsonwebtoken.verify);
 const sign = util.promisify(jsonwebtoken.sign);

 export default {
    verify,
    sign
 }