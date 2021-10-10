const jwt = require('jsonwebtoken');
const {UnauthenticatedError}=require('../errors');

const authenticationMiddleware = async (req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    // console.log(token);

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //if successful we will add a new object to req
        //then call the next middleware (which is dashboard)
        const {id,username}=decoded;
        req.user={id,username};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
}

module.exports = authenticationMiddleware