import mongoose from "mongoose";

export function redditTransformPosts(posts,user_id) {
    return posts.map(post => {
        const data = post.data;
        
        return {
            post_id:data.id,
            title: data.title,
            user_id:new mongoose.Types.ObjectId(user_id),
            author: data.author,
            body: data.selftext,
            thumbnail: data.thumbnail,
            link: "https://reddit.com"+data.permalink,
            service_id: new mongoose.Types.ObjectId("66d988fd2ac34f51149d153e"),
            service_name:"reddit"
        };
    });
}
