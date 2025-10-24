/**
 * Importing modules 
 */

import express from "express"

//seting up express-router
const router = express.Router()

import {getAllUserInformations, editUserInfo, deleteUserAccount} from "../controllers/userController.js"
import { authenticate } from "../middleware/authMiddleware.js"

/**
 * Setting up endpoints
 */

//all user nformations
router.get('/me', authenticate, getAllUserInformations)

//delete user account
router.delete("/me", authenticate, deleteUserAccount)

router.patch("/me", authenticate, editUserInfo)

// Tymczasowy endpoint do debugowania - dodaj do userRoutes.js
router.get('/debug', authenticate, async (req, res) => {
    try {
        const userFromReq = req.user;
        const userFromDB = await User.findById(req.user._id);
        const userFromDBSelect = await User.findById(req.user._id).select('-password');
        
        res.json({
            userFromRequest: {
                id: userFromReq._id,
                email: userFromReq.email,
                username: userFromReq.username,
                idAdmin: userFromReq.idAdmin
            },
            userFromDB: {
                id: userFromDB._id,
                email: userFromDB.email,
                username: userFromDB.username,
                idAdmin: userFromDB.idAdmin
            },
            userFromDBSelect: {
                id: userFromDBSelect._id,
                email: userFromDBSelect.email,
                username: userFromDBSelect.username,
                idAdmin: userFromDBSelect.idAdmin
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//exporting router
export default router