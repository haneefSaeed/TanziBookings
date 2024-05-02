import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


export type UserType = {
    _id : string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

};


const userSchema = new mongoose.Schema({
    email: {type: String , required: true, unique: true}, 
    password: {type: String, require: true},
    firstName : {type: String, required: true},
    lastName : {type:String, required:true}
});
async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
}

userSchema.pre("save", async function (next) {
    if (this.isModified('password') && typeof this.password === 'string') {
        try {
            const hashedPassword = await hashPassword(this.password);
            this.password = hashedPassword;
        } catch (error) {
            console.error("Error hashing password:", error);
            throw new Error("Error hashing password");
        }
    }
    next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;