import UserBookmark from "@/model/userBookmark";
import { verifyToken } from "../lib/verifyJWT";
import mongoose from "mongoose";
import connectDB from "../lib/connectDB";
import groupByService from "@/helpers/groupByService";

async function handler(req, res) {
    try{
        await connectDB();
        const user_id = new mongoose.Types.ObjectId(req.user._id);
        console.log(user_id);
        
        const bookmarks = await UserBookmark.find({user_id:user_id});
        const groupedServices = groupByService(bookmarks);
        return res.status(200).json(groupedServices);

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal error"})
    }
}
export default (req, res) => verifyToken(req, res, () => handler(req, res));