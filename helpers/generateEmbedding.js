import OpenAI from 'openai';  // Import the OpenAI class
import { fetchPageContent } from './screapeLink';
import UserBookmark from '@/model/userBookmark';
import connectDB from '@/pages/api/lib/connectDB';
import mongoose from 'mongoose';
import { _decodeChunks } from 'openai/streaming';
import Chunk from '@/model/chunk';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbedding(url) {
    try {
        const content = await fetchPageContent(url);
        if (!content) {
            return { error: 'Failed to fetch content.' };
        }

        const maxLength = 4096; // Prevent exceeding token limit
        const trimmedContent = content.slice(0, maxLength);

        // Generate embedding using the new API pattern
        const response = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: trimmedContent,
        });

        const embedding = response.data[0].embedding; // Access embedding from response
        return embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        return { error: 'Error generating embedding.' };
    }
}


export async function searchBookmarks(userId, query, limit=4) {
  // Generate query embedding
  console.log("query:",query);
  console.time()
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });
  // console.log("res:",response);
  

  const queryEmbedding = response.data[0].embedding;
  // console.log(queryEmbedding);
  
  await connectDB();
  const bookmarks = await Chunk.aggregate([
    {
      "$vectorSearch": {
        "exact":false,
        "index": "vector_index",
        "path": "embedding",
        "queryVector": queryEmbedding,
        "numCandidates": 100,
        "limit": limit,
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
        "numericScore": { $gt: 0.7 }
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
  console.timeEnd();
  return bookmarks;
}