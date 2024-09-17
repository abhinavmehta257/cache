import { fetchPocketSaves, fetchRedditSaves } from "@/utils/getSaves";
import connectDB from "../lib/connectDB";
import UserService from "@/model/userService";
import UserBookmark from "@/model/userBookmark"; // Assuming the model is named UserBookmark
import saveBookmarks from "@/helpers/saveBookmarks";

export default async function handler(req, res) {
    await connectDB();

    if(req.method !="GET"){
        return res.status(403).json({message:"Message not allowed"});
    }
    

    const userServices = await UserService.find({});
    if (!userServices) {
        return res.json({ message: "no services" });
    }

    // Loop through each user service and fetch saved content based on service_id
    userServices.forEach(async (userService) => {
        const service_id = userService.service_id.toString();
        let saves;

        switch (service_id) {
            case "66d988fd2ac34f51149d153e": // Reddit service
                saves = await fetchRedditSaves(userService.access_token, userService.user_name, userService.user_id);
                break;
            case "66d988fd2ac34f51149d153d": // Pocket service
                saves = await fetchPocketSaves(userService.access_token, userService.user_id);
                break;
        }

        if (saves && saves.length > 0) {
            await saveBookmarks(saves);
       }

        console.log(saves);
    });

    res.json({ message: "Bookmarks saved successfully!" });
}
