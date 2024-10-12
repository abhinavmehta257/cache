import UserBookmark from "@/model/userBookmark";
import { verifyToken } from "../lib/verifyJWT";
import mongoose from "mongoose";
import connectDB from "../lib/connectDB";
import groupByService from "@/helpers/groupByService";

async function handler(req, res) {
    if(req.method !="GET"){
        return res.status(403).json({message:"Message not allowed"});
    }
    try{
        await connectDB();
        const user_id = new mongoose.Types.ObjectId(req.user._id);
        console.log(user_id);
        
        const bookmarks = await UserBookmark.aggregate([
            { $match: { user_id: { $eq: new mongoose.Types.ObjectId(user_id) } } },
            { $project: { embedding: 0 } }
          ]);
        const groupedServices = groupByService(bookmarks);
        return res.status(200).json(groupedServices);

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal error"})
    }
}
export default (req, res) => verifyToken(req, res, () => handler(req, res));