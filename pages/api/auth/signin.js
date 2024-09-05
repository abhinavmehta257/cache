import User from "@/model/user";
import connectDB from "../lib/connectDB";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
const JWT_SECRET = process.env.JWT_SECRET
export default async function handler(req,res){
    try {
        await connectDB();
        const {email, password } = req.body;
    
        // Check if the user already exists
        
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (!existingUser) {
          return res.status(400).json({ message: 'Email is incorrect' });
        }
    
        const result = await bcrypt.compare(password, existingUser.password_hash, (err, result) => {
            if (err) {
                // Handle error
                console.error('Error comparing passwords:', err);
                return;
            }
        });
        console.log(result);
        
        if(result){
          return res.status(400).json({ message: 'password is incorrect' });
        }

        const token = jwt.sign(
            { _id: existingUser._id, email: existingUser.email },
            JWT_SECRET,
            { expiresIn: '3d' }
          );
    
        
        return res.status(201).json({ message: 'Login success', authToken: token });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', error });
      }   
} 