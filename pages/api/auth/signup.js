import User from "@/model/user";
import connectDB from "../lib/connectDB";
import jwt from 'jsonwebtoken';
import cors from "../lib/cors";


const JWT_SECRET = process.env.JWT_SECRET
export default async function handler(req,res){
  if (cors(req, res)) return;
    try {
        await connectDB();
        const { username, email, password } = req.body;
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already in use' });
        }
    console.log(username,email,password)
        // Create a new user
        const newUser = new User({
          username,
          email,
          password_hash: password,
        });

        const token = jwt.sign(
            { _id: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
          );
    
        await newUser.save();
        
        return res.status(201).json({ message: 'User created successfully', authToken: token });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', error });
      }
} 