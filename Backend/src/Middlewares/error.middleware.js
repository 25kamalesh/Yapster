
const ErrorHandler = (error,request,response,next) => {
    const Error = {...error}

    // Mongoose Bad Object ID
    if (error.name === 'CastError') {
        Error.message  = 'Resource not FOUND!!!'
        Error.statusCode = 400
    }

    // Mongoose Duplicate key error
    if (error.code === 11000) {
        Error.message = 'Duplicate Entry invalid!!'
        Error.statusCode = 404
    }
    
    response.status(Error.statusCode || 500).json({
        success: false,
        Message: Error.message || 'INTERNAL SERVER ERROR😔'
    })

}

export default ErrorHandler