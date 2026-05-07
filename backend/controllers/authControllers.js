import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{

    const userExist = await User.findOne({email : req.body.email})
    if (userExist){
        
        return res.status(403).send({status:false,message:"User already exist"})
    }
    const userData = req.body
    console.log(userData,"user")
    try{
        userData.password = await bcrypt.hash(userData.password,10);
        const data = await User.create(userData)
        
        res.status(200).send({
            status:true,
            message: "Successfully register!",
        
        })
    }catch(e){
        res.status(500).send(e.message)
    }

    
}

export const login = async(req,res)=>{
    const {email , password } = req.body
    try{
        const validUser = await User.findOne({email:email.toLowerCase()}).select("+password")

        if (!validUser){
            return res.status(401).send({status:false,message:"Invalid Credentails!"})
        }
        const isMatch = await bcrypt.compare(password,validUser.password)
        
        if (!isMatch){
            return res.status(401).send({status:false,message:"Invalid Credentails!"})
        }
        //Generate JWT Token
        const jwtToken = await validUser.generateJWTToken()

        // PUT JWT token in cookie
        // res.cookie("token", jwtToken, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production", 
        //   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        //   path: "/",
        // });

        
        return res.status(200).send({
            status:true,
            message:"Successfully login!",
            token : jwtToken,
            user:{
                id :validUser._id,
                name: validUser.FullName,
                email: validUser.email
            }
        })

    }catch(e){
        res.status(500).send(e.message)
    }
}

