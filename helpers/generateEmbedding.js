import OpenAI from 'openai';  // Import the OpenAI class
import { fetchPageContent } from './screapeLink';
import UserBookmark from '@/model/userBookmark';
import connectDB from '@/pages/api/lib/connectDB';
import mongoose from 'mongoose';

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


export async function searchBookmarks(userId, query) {
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
  const bookmarks = await UserBookmark.aggregate([
    {
      "$vectorSearch": {
        "index": "vector_index",
        "path": "embedding",
        "queryVector": queryEmbedding,
        "numCandidates": 100,
        "limit": 3,
        "filter":{ user_id:{$eq: new mongoose.Types.ObjectId(userId)} }
      }
    },
    {
      $project: {
        embedding: 0
      }
    }
  ]);
  console.timeEnd()
  return bookmarks;
}