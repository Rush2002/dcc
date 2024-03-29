import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mobile:{type:String},
    password:{type:String},
    role:{type:String},
});

export const userModel = mongoose.model("users",userSchema);


export const newUser = async (name,email,mobile,password,role) => {
    const userDoc = new userModel({
        name:name,
        email:email,
        mobile:mobile,
        role:role,
        password:password
    });
    try {
        await userDoc.save();
    } catch (error) {
        
    }
}
