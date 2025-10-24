/**
 * Importing modules
 */

import Recipe from "../models/recipe.js";
import User from "../models/user.js";
import { sendPrompt } from "../utils/aiModel.js";
import { prompt1, prompt2 } from "../utils/prompts.js"; 

/**
 * Utils
 */
const VALID_DIFFICULTIES = [1, 2, 3];

function cleanAiJson(rawText) {
    let cleanText = rawText.trim();
    
    if (cleanText.startsWith('```json')) {
        cleanText = cleanText.substring(7);
    } 
    if (cleanText.endsWith('```')) {
        cleanText = cleanText.substring(0, cleanText.length - 3); 
    }
    
    return cleanText.trim();
}



/**
 * Endpoints controllers
 */

//generate recipe from intention
export const generateRecipeFromIntention = async (req, res) => {
    

    const { intention, maxTime, dificultyLevel, numberOfPortions } = req.body; 
    
    if (!intention || !maxTime || !dificultyLevel) {
        return res.status(400).json({ error: "Missing required parameters (intention, maxTime, dificultyLevel)." });
    }

    if (!VALID_DIFFICULTIES.includes(dificultyLevel)) {
        return res.status(400).json({ error: "Difficulty level is invalid. Expected 1, 2, or 3." });
    }

    try {
        
        const userHealthRequirements = req.user.healthRequirements || []; 
        
       
        const promptContent = prompt1(intention, maxTime, userHealthRequirements, dificultyLevel, numberOfPortions); 
        const rawJsonText = await sendPrompt(promptContent); 

        
        let recipe;
        try {
            const cleanText = cleanAiJson(rawJsonText);
            
            if (!cleanText) {
                throw new Error("AI returned empty content after cleanup.");
            }
            
            recipe = JSON.parse(cleanText);

        } catch (parseError) {
            console.error("BŁĄD KRYTYCZNY: Parsowanie JSON zawiodło. Surowy tekst:", rawJsonText);
            
            return res.status(502).json({ 
                message: "AI returned invalid data format. Could not parse JSON.",
                ai_response_snippet: rawJsonText.substring(0, 500) 
            });
        }

        recipe.ownerId = req.user._id; 
        

        const newRecipe = new Recipe(recipe);
        await newRecipe.save();
    
        
        return res.status(201).json(recipe); 

    } catch (error) {
        return res.status(500).json({ message: "Sorry, something went wrong on the server." });
    }
};

//generate recipe from ingridient list

export const generateRecipeFromIngridientList = async (req, res) => {
    
    const { ingridientList, maxTime, dificultyLevel, numberOfPortions } = req.body;
    
    if (!ingridientList || !maxTime || !dificultyLevel) {
        return res.status(400).json({ error: "Missing required parameters (ingridientList, maxTime, dificultyLevel)." });
    }

    if (!VALID_DIFFICULTIES.includes(parseInt(dificultyLevel))) {
        return res.status(400).json({ error: "Difficulty level is invalid. Expected 1, 2, or 3." });
    }

    try {
        const userHealthRequirements = req.user.healthRequirements || []; 
        
        const ingredientsArray = ingridientList
            .split(',') 
            .map(item => item.trim()) 
            .filter(item => item.length > 0); 

        if (ingredientsArray.length === 0) {
            return res.status(400).json({ error: "Ingredient list cannot be empty after parsing. Please provide at least one ingredient." });
        }
        
        const promptContent = prompt2(
            ingredientsArray,
            maxTime, 
            userHealthRequirements, 
            dificultyLevel, 
            numberOfPortions
        ); 
        
        const rawJsonText = await sendPrompt(promptContent); 

        let recipe;
        try {
            const cleanText = cleanAiJson(rawJsonText);
            
            if (!cleanText) {
                throw new Error("AI returned empty content after cleanup.");
            }
            
            recipe = JSON.parse(cleanText);

        } catch (parseError) {
            console.error("BŁĄD KRYTYCZNY: Parsowanie JSON zawiodło. Surowy tekst:", rawJsonText);
            
            return res.status(502).json({ 
                message: "AI returned invalid data format. Could not parse JSON.",
                ai_response_snippet: rawJsonText ? rawJsonText.substring(0, 500) : "Brak surowej odpowiedzi"
            });
        }

        if (recipe && recipe.error) {
            return res.status(200).json({ message: "Sorry, AI model cannot create a rational recipe with these ingredients." });
        }

        if (!recipe || !recipe.tytul) {
             return res.status(500).json({ message: "AI returned empty or invalid recipe structure." });
        }
        
        recipe.ownerId = req.user._id; 
        
        const newRecipe = new Recipe(recipe);
        await newRecipe.save();
    
        return res.status(201).json(recipe); 

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Sorry, something went wrong on the server." });
    }
}

//delete recipe

export const deleteRecipe = async (req, res) => {

    const {id} = req.params;

    try {
        
        const recipe = await  Recipe.findById(id);
        if(!recipe){
            return res.status(400).json({error:`Could not found found any recipe of yours with id: ${id}`});
        }

        if (recipe.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: `You are not authorized to delete recipe with id: ${id}.` });
        }

        await Recipe.deleteOne({_id:id})

        return res.status(200).json({message:`Succesfully deleted recipe with id: ${id}`})

    } catch (error) {
        return res.status(500).json({ message: "Sorry, something went wrong on the server." });
    }

}

//view recipe

export const viewRecipe = async (req, res) => {

    const {id} = req.params;

    try {
        
        const recipe = await Recipe.findById(id);
        if(!recipe){
            return res.status(404).json({error:`Recipe with id: ${id} not found`})
        }

        const userIdFromRecipe = recipe.ownerId;

        const user = await User.findById(userIdFromRecipe);

        let ownerUsername;

        if(!user){
            ownerUsername = "Deleted User"
        }else{
            ownerUsername = user.username;
        }

        return res.status(200).json({
            ownerUsername:ownerUsername,
            recipe:recipe
        })

    } catch (error) {
        return res.status(500).json({error:"Sorry something went wrong"})
    }

}

//get all recipes of yours
export const getAllMyRecipes = async (req, res, next) => { 

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "User not authenticated or user ID missing." });
        }
        
        const allRecipes = await Recipe.find({ ownerId: req.user._id }, "-ownerId");

    
        if (allRecipes.length === 0) {
            return res.status(200).json({recipes: []});
        }

        return res.status(200).json(allRecipes);

    } catch (error) {
        console.error("Error in getAllMyRecipes:", error);
        return res.status(500).json({ error: "Sorry, something went wrong." }); 
    }
};