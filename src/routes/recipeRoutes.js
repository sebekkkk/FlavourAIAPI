/**
 * Importing modules
 */

import express from "express";
import  { body , ExpressValidator } from "express-validator";


/**
 * Importing custom modules
 */
import {generateRecipeFromIntention, generateRecipeFromIngridientList ,deleteRecipe, viewRecipe, getAllMyRecipes} from "../controllers/recipeController.js";
import { authenticate } from "../middleware/authMiddleware.js";


/**
 * Setting up router
 */
const router = express.Router();

/**
 * Endpoints
 */

//generate recipe from intenion
router.post("/generateV1", authenticate, generateRecipeFromIntention);

//generate recipe from avilable ingridient list
router.post("/generateV2", authenticate, generateRecipeFromIngridientList)

//view recipt
router.get("/:id", authenticate, viewRecipe);

//delete receipt
router.delete("/:id", authenticate, deleteRecipe);

//get all receipts
router.get("/", authenticate, getAllMyRecipes);

export default router;