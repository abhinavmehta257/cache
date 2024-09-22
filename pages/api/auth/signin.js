import User from "@/model/user";
import connectDB from "../lib/connectDB";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from "../lib/cors";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    // Apply CORS middleware
    if (cors(req, res)) return;
    

  // Handle the POST request
  if (req.method === 'POST') {
    try {
      await connectDB();

      // Ensure body parsing works (if you're using Next.js built-in API routes, this should work by default)
      const { email, password } = req.body;
      console.log(req.body);

      // Check if the user exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: 'Email or password is incorrect' });
      }

      // Compare passwords using bcrypt
      const passwordMatch = await bcrypt.compare(password, existingUser.password_hash);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Email or password is incorrect' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { _id: existingUser._id, email: existingUser.email },
        JWT_SECRET,
        { expiresIn: '3d' }
      );

      // Return success with the token
      return res.status(201).json({ message: 'Login success', authToken: token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
