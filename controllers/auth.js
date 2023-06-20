const User = require('../models/Users')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
const {name, email, password} = req.body

    //hash User passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    const tempUser = { name, email, password:hashPassword}
    const user = await User.create({ ...tempUser })

    //Generate Token
    const token = jwt.sign({userId:user._id, name:user.name},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME,
    }) 
    res.status(StatusCodes.CREATED).json({user: {name: user.name} ,token })
}

const login = async (req, res) => {
    res.send('login user')
} 

module.exports = {
    register, 
    login
}