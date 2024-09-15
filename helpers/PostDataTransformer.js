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
export function pocketTransformPosts(jsonData, userId) {
    const transformed = Object.values(jsonData.list).map(item => ({
      post_id: item.item_id,
      user_id: userId, // Assuming userId is provided externally
      title: item.resolved_title || item.given_title || 'Untitled',
      author: item.domain_metadata?.name || 'Unknown',
      body: item.excerpt || '',
      thumbnail: item.top_image_url || '',
      link: item.resolved_url || item.given_url,
      service_id: new mongoose.Types.ObjectId("66d988fd2ac34f51149d153d"), // Assuming serviceId is provided externally
      service_name: "Pocket", // Assuming serviceName is provided externally
    }));
  
    return transformed;
  }