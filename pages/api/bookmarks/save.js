import { verifyToken } from "../lib/verifyJWT";
import connectDB from "../lib/connectDB";
import UserBookmark from "@/model/userBookmark";
import cors from "../lib/cors";
import { generateEmbedding } from "@/helpers/generateEmbedding";
import { fetchPageContent } from "@/helpers/screapeLink";
import Chunk from "@/model/chunk";
import {getDomainName} from "@/helpers/getDomainName";

async function handler(req, res) {
      // Apply CORS middleware
    if (cors(req, res)) return;
    
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
    }
  
    try {
      await connectDB();
      const user_id = req.user._id; // User ID is now available from the verified token

      const bookmark = await UserBookmark.findOne({user_id,link:req.body.link, post_id:req.body.post_id});

      if(bookmark){
       return res.status(403).json({ message: 'Bookmark already saved'});
      }

      console.log({...req.body, user_id})
      const {link} = req.body;
      // const embedding = await generateEmbedding(link)

      // const newBookmark = new UserBookmark({...req.body, user_id,content});
      const service_name = getDomainName(req.body.link);
      const construct_bookmark = {
        ...req.body,
        user_id,
        service_name: req.body.service_name || service_name
      }

      const newBookmark = new UserBookmark(construct_bookmark);

      const content = await fetchPageContent(link, user_id, newBookmark._id);

      // Generate embeddings for each chunk and save
      const chunksWithEmbeddings = await Promise.all(
        content.map(async chunk => {
          const embedding = await generateEmbedding(chunk.content);
          return { 
            bookmark_id: chunk.bookmark_id,
            user_id: chunk.user_id
            , embedding };
        })
      );
      const chunks = await Chunk.insertMany(chunksWithEmbeddings);
      console.log("chunks saved:",chunks.length);

      await newBookmark.save();
      res.status(201).json({ message: 'Bookmark saved successfully', bookmark: newBookmark });
    } catch (error) {
      console.error('Error saving bookmark:', error);
      res.status(500).json({ message: 'Internal server error', status:false });
    }
  }

export default (req, res) => verifyToken(req, res, () => handler(req, res));
