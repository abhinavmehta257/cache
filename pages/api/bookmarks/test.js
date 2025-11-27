import { searchBookmarks } from "@/helpers/generateEmbedding";
import { verifyToken } from "../lib/verifyJWT";
import OpenAI from 'openai';  // Import the OpenAI class
import connectDB from '../lib/connectDB';
import cors from "../lib/cors";
import Chunk from '@/model/chunk';
import mongoose from 'mongoose';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
async function handler(req, res) {
  const {query } = req.body;
    if (cors(req, res)) return;
  const userId = req.user._id; // User ID is now available from the verified token
    
  if (!userId || !query) {
    return res.status(400).json({ error: 'Missing user ID or query' });
  }

  // Search bookmarks for the user
  console.log("query:",query);

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });
  // console.log("res:",response);
  
  console.log("userId:",userId);
  const queryEmbedding = response.data[0].embedding;
  console.log(queryEmbedding);
  
  await connectDB();
//    const chunks = await Chunk.find({ user_id: userId }).limit(10);
  const bookmarks = await Chunk.aggregate([
    {
      "$vectorSearch": {
        "exact":false,
        "index": "vector_index",
        "path": "embedding",
        "queryVector": queryEmbedding,
        "numCandidates": 100,
        "limit": 6,
        "filter":{ user_id:{$eq: new mongoose.Types.ObjectId(userId)},}
      }
    },
    {
      $project: {
        "embedding": 0,
        "score": { "$meta": "vectorSearchScore" }
      }
    },
    {
      $addFields: {
        "numericScore": { $convert: { input: "$score", to: "double", onError: 0, onNull: 0 } }
      }
    },
    {
      $match: {
        "numericScore": { $gt: 0.65 }
      }
    },
    {
      $lookup: {
        from: "userbookmarks",               // Collection name for UserBookmark
        localField: "bookmark_id",           // Field in the Chunk collection
        foreignField: "_id",                 // Field in the UserBookmark collection
        as: "userBookmark"                   // Field to store joined data
      }
    },
    {
      $unwind: {
        path: "$userBookmark",               // Unwinds the `userBookmark` array
      }
    },
    {
      $group: {
        _id: "$bookmark_id",
        userBookmark: { $first: "$userBookmark" }  // Selects the first unique bookmark
      }
    },
    {
      $replaceRoot: { newRoot: "$userBookmark" }  // Replaces the root document with `userBookmark`
    }
  ]);
//   console.log("bookmarks found:",chunks);
//   console.log("results:",results);
  
  // Return the top results, including the bookmark link and content
  return res.status(200).json(bookmarks);
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));