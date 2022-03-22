function errorHandler(err, req, res, next) {
    console.log(err);

    let status = null;
    let errMessage = null;

    switch (err.name) {
        // log()
        case "SequelizeValidationError":
            status = 400;
            errMessage = err.errors.map(el => {
                return el.message});
            break;
        case "SequelizeUniqueConstraintError":
            status = 400;
            errMessage = err.errors.map(el => {
                return el.message});
            break;  
        case "ERROR_ID_NOT_FOUND":
            status = 404
            errMessage = `data with id ${err.id} not found`
            break;
        case "WRONG_EMAIL_AND_PW":
            status = 401;
            errMessage = "Kombinasi email dan password tidak ditemukan!";
            break;
        case "JsonWebTokenError":
            status = 401
            errMessage = "error token"
            break;
        case "NOT_AUTHORIZED":
            status = 401
            errMessage = "not authorized"
            break;
        case "EMAIL_INVALID":
            status = 401;
            errMessage = "Invalid email or password"
            break;
        case "INVALID_INPUT":
            status = 404
            errMessage = "Id not found"
            break;
        default:
            status = 500;
            errMessage = "Internal Server Error";
            break;
    }

    res.status(status).json({
        success: false,
        err: errMessage,
    });
}

module.exports = errorHandler