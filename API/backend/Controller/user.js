import User from "../Model/User.js";
import bcrypt from "bcryptjs";

/* ---------------------- Update User -------------------- */
export const updateUser = async (req, res, next) => {

    try {

        //hash the password
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: {...req.body, password: hash} },
                { new: true }
                ); //If password also Update 
                res.status(200).json(updatedUser);
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            ); //Update User
            res.status(200).json(updatedUser);
        }

    } catch (error) {
        next(error);
    }
};

/* ------------------------ Delete User ------------------------ */
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id); //User deleted

        res.status(200).json("user has been deleted");
    } catch (error) {
        next(error);
    }
};


/* ------------------------- Get User --------------------------- */
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id); //Get user

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


/* --------------------------- Get all user ------------------------ */
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // Get all users

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}