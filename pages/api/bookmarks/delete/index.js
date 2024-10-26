import UserBookmark from "@/model/userBookmark";
import connectDB from "../../lib/connectDB";
import mongoose from "mongoose";
import { verifyToken } from "../../lib/verifyJWT";
import Chunk from "@/model/chunk";

async function handler(req, res){
    const { bookmark_id } = req.query;

  // Only allow DELETE method
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await connectDB();

    // Ensure the bookmark ID is valid
    if (!mongoose.Types.ObjectId.isValid(bookmark_id)) {
      return res.status(400).json({ error: 'Invalid bookmark ID' });
    }

    // Find and delete the bookmark by ID
    const deletedBookmark = await UserBookmark.findByIdAndDelete({_id:new mongoose.Types.ObjectId(bookmark_id)});
    await Chunk.deleteMany({ bookmark_id: bookmark_id })
    console.log(deletedBookmark);
    
    // If the bookmark is not found, return 404
    if (!deletedBookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    // Successfully deleted
    return res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the bookmark' });
  }
}
export default (req, res) => verifyToken(req, res, () => handler(req, res));