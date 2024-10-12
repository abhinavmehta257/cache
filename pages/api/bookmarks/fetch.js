import { verifyToken } from "../lib/verifyJWT";
import connectDB from "../lib/connectDB";
import UserBookmark from "@/model/userBookmark";
import cors from "../lib/cors";

async function handler(req, res) {
  // Apply CORS middleware
  if (cors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const user_id = req.user._id; 
  console.log(user_id);
  
  try {
    await connectDB();
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ message: 'URL parameter is required', status:false });
    }

    const bookmark = await UserBookmark.findOne({user_id:user_id, link: url },{ embedding: 0 });

    if (bookmark) {
      return res.status(200).json(bookmark);
    } else {
      return res.status(404).json({ message: 'Bookmark not found' , status:false});
    }
  } catch (error) {
    console.error('Error fetching bookmark:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));
