/**
 * Importing modules
 */
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';


/**
 * Custom modules import
 * --sendMail(provide acces to send mail)
 */
import { sendMail } from "../utils/nodeMailer_setup.js";
import User from "../models/user.js"
import config  from "../config/config.js";
import { htmlForEmailVeryfication } from "../utils/utils.js";



/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user:
 *          - Validate request body
 *          - Check if username or email already exists in DB
 *          - Hash password
 *          - Store temporary user data in Redis (15 min)
 *          - Sign JWT token containing Redis ID
 *          - Send verification email with activation link
 * @access  Public
 *
 * @param   {Object}  req - Express request object
 * @param   {Object}  req.body
 * @param   {string}  req.body.username - Desired username
 * @param   {string}  req.body.email - User email address
 * @param   {string}  req.body.password - User password
 *
 * @param   {Object}  res - Express response object
 *
 * @returns {201} JSON { message: "Succesfully send email..." }
 * @returns {400} JSON { errors: [validation errors] } - If validation fails
 * @returns {409} JSON { error: "User already exists" } - If username/email taken
 * @returns {500} JSON { error: "Sorry something went wrong" } - On server error
 */


export const register = async (req, res) => {

    //catching for express-validator errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const msgs = errors.array().map(err => err.msg);
        return res.status(400).json({error: msgs})
    }
    
    //destructuring user information from an request object
    const {username, email, password} = req.body;

    //importing redis client from app.locals
    const redisClient = req.app.locals.redis

    //checking if email is not on locked list
    if(await redisClient.get(email)){
        return res.status(423).json({error:"Email locked for veryfication for 15 minutes try later"})
    }

    //catching errors if needed
    try {
        
        //checking if user with this email or username already exist in db 
        if(await User.exists({ $or : [{email}, {username}]})){
            return res.status(409).json({error:"User with this email or username already exist in database"});
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        //const object named payload for 
        const payload = {
            username:username,  
            password:hashedPassword,
            email:email
        }

        //saving uuidv4-userObject to redis
        const id = uuidv4();
        await redisClient.setEx(id, 60 * 15, JSON.stringify(payload));

        //signing id of object in redis in jwt token
        const token = jwt.sign({id:id}, config.jwtToken, {expiresIn:"15m"});

        //html page for email verifying
        const link = `http://food-tanzania.gl.at.ply.gg:28731/apiv1/auth/email-verify/${token}`;

        const html = htmlForEmailVeryfication(link, payload.username);

        //saving email to redis for 15 minuts to minimalize bad guys spam
        const EMAIL_LOCK_TTL = 60 * 15;
        await redisClient.setEx(email, EMAIL_LOCK_TTL, ".");

        //email sending
        sendMail(email,"Email Verify!", html);

        //succesfull response
        res.status(201).json({message:`Succesfully send email with veryfication link to: ${email}`});

    } catch (error) {
        //sending 500 http error(server error)
        console.error(error)
        return res.status(500).json({error:"Sorry something went wrong"})
        
    }

}


/**
 * @route   GET /api/v1/auth/email-verify/:token
 * @desc    Verify user's email and create account:
 *          - Decode JWT token containing Redis ID
 *          - Retrieve temporary user data from Redis
 *          - Parse and validate the user object
 *          - Check if email or username already exists in DB
 *@access Public
 *@param {Object} req - Express request object
 *@param {Object} req.params
 *@param {string} req.params.token - JWT token containing Redis verification ID
 *@param {Object} res - Express response object
 *@returns {201} JSON { message: "User created successfully" } - When the account is verified and saved
 *@returns {401} JSON { error: "Invalid token or expired" } - If JWT is invalid or Redis data is missing
 *@returns {409} JSON { error: "User with this email or username already exists" } - If duplicate found in DB
 *@returns {500} JSON { error: "Sorry something went wrong" } - For unexpected server errors
*/
export const emailVerify = async (req, res) => {

    //destructuring token from url param
    const {token} = req.params

    //importing redis client from app.locals
    const redisClient = req.app.locals.redis
    
    try {
        
        let decodedToken;

        //decoding id from jwt token 
        try {
            decodedToken = jwt.verify(token, config.jwtToken);
        } catch (error) {
            console.error(error);
            return res.status(401).json({error:"Invalid token or expired"});
        }

        //retriving from redis 
        const objectFromRedis = await redisClient.get(decodedToken.id)

        //checking for errors
        if(!objectFromRedis){
            return res.status(401).json({error:"Invalid token or expired"});
        }

        //parsing stringified object to jsObject
        const userObject = JSON.parse(objectFromRedis);

        //retriving 
        const {email, username, password} = userObject

        //checkig if real email user have already made account in service
        if(await User.exists({ $or : [{email}, {username}]})){
            return res.status(409).json({error:"User with this email or username already exist in database"});
        }

        //saving new user in db if everything went succesfully
        await new User({
            username:username,
            email:email,
            password:password
        }).save()
       
        //returning succesfull info
        return res.status(201).json({message:"Everything went succesfully user created"})

    } catch (error) {
        return res.status(500).json({error:"Sorry something went wrong"})
    }


}

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate a user and return a JWT token:
 *          - Validate email and password from request body using express-validator
 *          - Check if the user exists in the database
 *          - Compare submitted password with hashed password in DB
 *          - Create and sign a JWT token if authentication succeeds
 * @access  Public
 * @param {Object} req - Express request object
 * @param {Object} req.body
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 * @returns {200} JSON { message: "Successfully logged in", token: "<JWT_TOKEN>" } - When credentials are valid
 * @returns {400} JSON { error: ["<validation error messages>"] } - If email or password is missing/invalid
 * @returns {401} JSON { error: "User with this email does not exist or password is incorrect" } - If authentication fails
 * @returns {500} JSON { error: "Sorry something went wrong" } - For unexpected server errors
 */
export const login = async (req, res) => {

    //destructuring user information from an request object
    const {email, password} = req.body;


    //catching for express-validator errors

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const msgs = errors.array().map(err => err.msg);
        return res.status(400).json({error: msgs})
    }

    try {
    
        //checking if user with this email exist
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({error:"User with this email does not exist or password is incorrect"});
        }

        //comparing password if wrong return 401 http 
        if(!(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error:"User with this email does not exist or password is incorrect"});
        }

        //creating payload for jwt token
        const userPayload = {
            _id:user._id,
            role:user.idAdmin
        };

        //signing jwt token
        const token = jwt.sign(userPayload, config.jwtToken, {expiresIn:"1d"});
    
        return res.status(200).json({message:"Succesfully logged in", token:token})

    } catch (error) {
        return res.status(500).json({error:"Sorry something went wrong"})
    }

}

