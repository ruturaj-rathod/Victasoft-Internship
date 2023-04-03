import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import session from "express-session";

import User from "../Model/User.js";
import { createError } from "../Utils/error.js";

/* ---------------------- Register the User ----------------------- */
export const register = async (req, res, next) => {
    try {

        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //Create a user
        const newUser = new User({
            ...req.body,
            isAdmin: Boolean(req.body.isAdmin) || false,
            password: hash
        });

        await newUser.save();

        res.status(200).send("User has been created");
    } catch (error) {
        next(error);
    }
};

/* ------------------------- Login the user -------------------------- */
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username}); //find user with username

        //if user has not found
        if(!user) {
            return next(createError(404, "User not found"));
        }

        //Check the password is coorecte
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) {
            return next(createError(400, "Wrong user name or password"));
        }

        //Genearte token for login
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.JWT
        )

        const {password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token", token, { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24})
            .status(200)
            .json({ details: {...otherDetails}, isAdmin, token: token});

    } catch (error) {
        next(error);
    }
};


/* ----------------------- Logout the user ---------------------------------- */
export const logout = async (req, res, next) => {
    req.session.destroy();
    res.clearCookie('access_token');
    res.clearCookie('connect.sid');
    res.send('Cookie cleared');
}

