/**
 * Importgin modules
 */

import User from "../models/user.js";
import bcrypt from "bcrypt"
import { sendMail } from "../utils/nodeMailer_setup.js";
import {htmlForAccountDeletionByUser} from "../utils/utils.js"

/**
 * Endpoints
 */

//get all user data
export const getAllUserInformations = async (req, res) => {
    try {
        // Pobierz świeże dane użytkownika z bazy
        const user = await User.findById(req.user._id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.username,
            isAdmin: user.idAdmin  
        });
    } catch (error) {
        return res.status(500).json({
            message: "Sorry something went wrong"
        })
    }
}

//edit user info
export const editUserInfo = async (req, res) => {
    let { newEmail, newPassword, newUsername } = req.body;

    try {
        
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        if (newPassword) {
            newPassword = await bcrypt.hash(newPassword, 12);
            user.password = newPassword;
        }
        
        if (newEmail) user.email = newEmail;
        if (newUsername) user.username = newUsername;

        await user.save()

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                idAdmin: user.idAdmin  // ✅ DODAJ TO!
            },
        });

    } catch (error) {
        console.error("Edit user error:", error);
        return res.status(500).json({ error: "Sorry something went wrong" });
    }
}


export const deleteUserAccount = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { password } = req.body; 

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    try {
        const isPasswordCorrect = await bcrypt.compare(password, req.user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Incorrect password" }) 
        }

        await sendMail(req.user.email, "Account Deleted", htmlForAccountDeletionByUser(req.user.email))

        await User.findByIdAndDelete(req.user._id)

        return res.status(200).json({ message: "Account deleted successfully" })

    } catch (error) {
        console.error("Delete account error:", error);
        return res.status(500).json({ error: "Sorry, something went wrong" })
    }
}