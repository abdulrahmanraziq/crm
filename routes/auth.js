import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();



const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // Check if required fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter all required fields!" });
    }
  
    // Validate the email format using a regular expression
    const emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailReg.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }
  
    try {
      // Check if the user exists in the database
      const doesUserExist = await User.findOne({ email });
  
      if (!doesUserExist) {
        // If the user is not found, return an error
        return res.status(400).json({ error: "Invalid user or password" });
      }
  
      // Compare the provided password with the stored hashed password
      const doesPasswordMatch = await bcrypt.compare(password, doesUserExist.password);
  
      if (!doesPasswordMatch) {
        // If the password does not match, return an error
        return res.status(400).json({ error: "Invalid user or password" });
      }
  
      // Create a payload with user ID to be included in the JWT token
      const payload = { _id: doesUserExist._id };
  
      // Generate the JWT token with the secret and expiration time
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Return the token in the response
      return res.status(200).json({ token });
  
    } catch (error) {
      console.error(error);
      // Return a server error if something went wrong
      return res.status(500).json({ error: "Server error, please try again later" });
    }
  });
  

router.post("/register", async (req, res) => {
      
        
        const {name, email, password} = req.body;

        //Check the all missging fields

        if(!name || !email || !password)
            return res.status(400).json({error: "Please enter the all required fields"});

        //Name validation

        if(name > 25) return res.status(400).json({error: "Name should be less than 25 characters"});

        //Email validation

        const emailReg =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!emailReg.test(email))
            return res.status(400).json({error: "Please enter valid email address"});

        //Password validation

        if(password.length <= 6)
            return res.status(400).json({error: "Password mush be atlease 6 characters long"});

    try {   

        const doesUserAlreadyExist = await User.findOne({email});

        if(doesUserAlreadyExist)
            return res.status(401).json({error: `User with that ${email} is already exists, Please try with another mail`});

        //Hash the password

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({name, email, password: hashedPassword});

        //Save the user 

        const result = await newUser.save();

        result._doc.password = undefined;

        return res.status(201).json({...result._doc});


        
    } catch (err) {

        console.log(err);
        return res.status(500).json({error: err.message});
        
    }
} )

export default router;