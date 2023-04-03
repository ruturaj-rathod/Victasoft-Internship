const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwtToken');

exports.createUser = (async (req, res) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const password = await bcryptjs.hash(req.body.password, salt);

        const user = await User.create({...req.body, password});
        res.status(200).json({
            success: true,
            user
        });
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false
        })
    }
});

exports.loginUser = (async (req, res) => {
    const email = req.body.email;
    try {
        const userData = await User.findOne({email});

        if(!userData) {
            return res.status(400).json({
                success: false,
                message: "Login with incorrect credentials"
            });
        }

        const passwordValidation = await bcryptjs.compare(req.body.password, userData.password);
        if(!passwordValidation) {
            return res.status(400).json({
                success: false,
                message: "Login with incorrect credentials"
            });
        }

        sendToken(userData, 200, res);

        // const data = {
        //     user: {
        //         id: userData._id
        //     }
        // }

        // const auth_token = jwt.sign(data, process.env.JWT); 

        // // res.cookie('auth_token', auth_token, { maxAge: 1000 * 60 * 60 * 23, httpOnly: true, sameSite: 'lax' })
        // return res.status(200).json({
        //     success: true,
        //     auth_token,
        //     email: userData.email
        // })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
});

//Update user details by user
exports.updateUser = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            locaiton: req.body.locaiton
        }

        const user = await User.findByIdAndUpdate(req.user.id, userData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

//update user role by admin
exports.updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userData = {
            name: req.body.name,
            email: req.body.email,
            locaiton: req.body.locaiton,
            role: req.body.role
        }
        user.role = req.body.role;
        await user.save({ validateBeforeSave: false});

        res.status(200).json({
            success: true,
            message: "User role is updated"
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
} 
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({
                succes: false,
                message: "User not found"
            });
        }
        await user.remove();
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User is not deleted"
        });
    }
}