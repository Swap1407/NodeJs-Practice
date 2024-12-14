const User = require("../models/User")
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            return res.status(400).json({
                message: 'User not found!'
            })
        }
        const isPasswordValid = (password == user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid UserName or Password!'
            })
        }
        const token = jwt.sign({ userName: user.userName }, 'secretkey', { expiresIn: '1h' });
        res.send({ token });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (user) {
            res.status(201).json({
                message: 'User Logged Out Seccessfully!',
                user
            })
        } else {
            res.status(404).json({
                message: 'User not Found',
                user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    login,
    logout
}