/**
 * Importing modules
 */
import bcrypt from "bcrypt";

/**
 * Importing custom modules
 */
import User from "../models/user.js"
import { sendMail } from "../utils/nodeMailer_setup.js"
import { htmlForAccountDeletionByAdmin } from "../utils/utils.js";


//get all users
export const getAllUsers = async (req,res) => {

    try {
        const users = await User.find({}, '-password');
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({error:"Sorry something went wrong"})
    }

}


//delete user by 
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   
    await User.deleteOne({ _id: id });

   
    await sendMail(user.email, "Account Deleted", htmlForAccountDeletionByAdmin(user.email))
    
    return res.status(200).json({
      message: `User with email ${user.email} has been deleted.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong" });
  }
};

//edit user info
export const editUserInfo = async (req, res) => {
    const {id} = req.params;
    let {newEmail, newPassword, newUsername} = req.body;

    try {
        
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:`User with ${id} not found`});
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
              isAdmin: user.isAdmin,
            },
          });

    } catch (error) {
        return res.status(500).json({error:"Sorry something went wrong"});
    }

}

//get one user by id

export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(id).select("_id email username idAdmin");

    if (!user) {
      return res.status(404).json({ message: `User with id: ${id} not found` });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Sorry, something went wrong" });
  }
};

