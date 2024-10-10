import Cast from '../models/Cast.js';

const create = (cast) => Cast.create(cast);

const getAll = () => Cast.find();

// Filtering the Casts who are already added. So they want be showed in the drop down
const getAllWithout = (castIds) => Cast.find({_id: { $nin: castIds}}); 
//const getAllWithout2= (castIds) => Cast.find().nin('_id', castIds); as second option

export default {
    create,
    getAll,
    getAllWithout
};
