import { searchBookmarks } from "@/helpers/generateEmbedding";
import { verifyToken } from "../lib/verifyJWT";

async function handler(req, res) {
  const {query } = req.body;
  const user_id = req.user._id; // User ID is now available from the verified token

  if (!user_id || !query) {
    return res.status(400).json({ error: 'Missing user ID or query' });
  }

  // Search bookmarks for the user
  const results = await searchBookmarks(user_id, query);
  console.log(results);
  
  // Return the top results, including the bookmark link and content
  return res.status(200).json(results);
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));