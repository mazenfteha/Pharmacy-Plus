//auth middleware where we can verify the token and and every thing is correct will get user id and pass it along with next route
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //pass the user to the next routes
        req.user = {userId:payload.userId, name:payload.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth