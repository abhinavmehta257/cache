import { fetchRedditSaves } from "@/utils/getSaves";
import { getRedditToken } from "@/utils/redditData";
import mongoose from "mongoose";
import { verifyToken } from "../lib/verifyJWT";
import saveBookmarks from "@/helpers/saveBookmarks";
import connectDB from "../lib/connectDB";

async function handler(req, res) {
    await connectDB();
    const user_id = new mongoose.Types.ObjectId(req.user._id);
    const service_id = new mongoose.Types.ObjectId("66d988fd2ac34f51149d153e");
    const {access_token,user_name} = await getRedditToken(user_id,service_id);
    const saves = await fetchRedditSaves(access_token,user_name,user_id);
    console.log(saves);
    await saveBookmarks(saves);
    res.json(saves);
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));