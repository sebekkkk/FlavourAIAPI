/**
 * Modules import
 */
import express from "express";
import { ExpressValidator, body } from "express-validator";

/**
 * Custom modules import
 */
import { register, login, emailVerify } from "../controllers/authController.js";

/**
 * Express router setup
 */

const router = express.Router()

/**
 * Endpoints 
 */

/**
 * @route Post /apiv1/auth/register
 * @desc tworzy token jwt z danymi od uzytkownika i wysyla na emial podany link do aktywacji tokena na /apiv1/auth/email-verify?token=<token>
 * @acces Public
 * @body {username: String, email: {type:String, min:8 chars}, password:String}
 */

router.post('/register',[
        body("email").isEmail().withMessage("E-Mail should be correct"),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[0-9]/).withMessage('Password must contain at least one number')
            .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character'),
        body("username").isLength({min:8})
    ],
    register
)

/**
 * @route   GET /api/v1/auth/email-verify/:token
 * @desc    Verify user's email and create account:
 *          - Decode JWT token containing Redis ID
 *          - Retrieve temporary user data from Redis
 *          - Parse and validate the user object
 *          - Check if email or username already exists in DB
 *          - Save new user to database if valid
 * @access  Public
 *
 * @param   {Object}  req - Express request object
 * @param   {Object}  req.params
 * @param   {string}  req.params.token - JWT token containing Redis ID
 *
 * @param   {Object}  res - Express response object
 *
 * @returns {201} JSON { message: "Everything went successfully user created" }
 * @returns {401} JSON { error: "Invalid token or expired" } - If token is invalid or Redis data missing
 * @returns {409} JSON { error: "User already exists" } - If email/username already exists in DB
 * @returns {500} JSON { error: "Sorry something went wrong" } - On server error
 */
router.get('/email-verify/:token',
    emailVerify
)



router.post('/login', [
        body("email").isEmail().withMessage("E-Mail should be correct"),
        body('password').notEmpty().withMessage("The password must be included")
    ],
    login
)

export default router;

