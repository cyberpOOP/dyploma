const AppError = require('../utils/appError')

const handleIDError = err =>{
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}

const handleDuplicateFieldsMongo = err =>{

    const value = err.errorResponse.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]

    const message = `Duplicate field value: ${value}`
    return new AppError(message, 400);
}

const handleValidationMongo = err =>{

    const errors = Object.values(err.errors).map(el => el.message)

    const message = `Invalid input data ${errors.join('. ')}`
    return new AppError(message, 400)

}

module.exports = ((err, req, res, next)=>{

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error'



    if(process.env.NODE_ENV === 'development'){
        if (err.isOperational){
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                stack: err.stack
            })
        }
        else{

            let error = {...err};

            if (error.kind === 'ObjectId') error = handleIDError(error);
            if(error.code === 11000) error = handleDuplicateFieldsMongo(error);
            if (err.name === "ValidationError") error = handleValidationMongo(error);

            res.status(error.statusCode).json({
                status: error.status,
                message: error.message
            })
        }

    }else if (process.env.NODE_ENV === 'production'){

        let error = {...err};
        if (error.kind === 'ObjectId') error = handleIDError(error);
        if(error.code === 11000) error = handleDuplicateFieldsMongo(error);
        if (error.name === "ValidationError") error = handleValidationMongo(error);

        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }
})