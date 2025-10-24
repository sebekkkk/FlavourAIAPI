/**
 * Importing modules
 */

import express from "express";
import  { body , ExpressValidator } from "express-validator";


/**
 * Importing custom modules
 */
import {getAllUsers, deleteUser, editUserInfo, getUserById} from "../controllers/adminController.js"
import { authenticate } from "../middleware/authMiddleware.js"
import { isAdmin }  from "../middleware/isAdminMiddleware.js";

/**
 * Setting up router
 */

const router = express.Router()

/**
 * Endpoints
 */

router.use(authenticate, isAdmin);

router.get('/users', getAllUsers);

router.get('/user/:id', getUserById);

router.patch('/user/update/:id', editUserInfo);

router.delete('/user/delete/:id', deleteUser);


export default router;