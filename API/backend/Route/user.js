import express from "express";

import { 
    updateUser,
    deleteUser,
    getUser,
    getUsers 
} from "../Controller/user.js";
import { verifyToken ,verifyUser, verifyAdmin } from "../Utils/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, verifyUser, updateUser); //Update
router.delete("/:id", verifyToken, verifyUser, deleteUser); //Delete
router.get("/:id", verifyToken, verifyUser, getUser); //Get user
router.get("/", verifyToken, verifyAdmin, getUsers); // Get all user

export default router;