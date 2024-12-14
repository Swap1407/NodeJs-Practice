const User = require("../models/User")

const createUser = async (req, res) => {
    try {
        // const newUser = new User(req.body);
        // await newUser.save();
        // or
        const newUser = await User.create(req.body);
        res.status(201).json({
            message: 'User Created!',
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json({
            message: 'User Fetched!',
            users
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(201).json({
            message: 'User Fetched!',
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(201).json({
            message: 'User Updated!',
            user: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(201).json({
            message: 'User Deleted!',
            userId: id
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}