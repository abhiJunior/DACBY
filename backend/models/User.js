import jwt from "jsonwebtoken"
import { model,Schema } from "mongoose";

const userSchema = new Schema({
    FullName : {
        type: String,
        require : [true,"Name is required"],
        minlength : [3,"Min 3 chara are req"],
        trim : true,
        lowercase : true 
    },
    email :{
        type : String,
        require : [true,"email is required"],
        unique : true,
        trim : true,
        lowercase: true 
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

},{
    timestamps:true
})

userSchema.methods= {
    generateJWTToken:function(){
        return jwt.sign(
            {id:this._id,email:this.email},
            process.env.JWT_PASSWORD,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    }
}

const User = model("User",userSchema)

export default User