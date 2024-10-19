export const getErrorMessage = (err) =>{
    switch(err.name){
        case 'ValidationError': // in case of mongoose Error / validationError
            return Object.values(err.errors)[0]?.message;
        default: 
            return err.message; // in case of manual triggered error
    }
}