export function redditTransformPosts(posts) {
    return posts.map(post => {
        const data = post.data;
        return {
            title: data.title,
            author: data.author,
            subreddit: data.subreddit,
            selftext: data.selftext,
            url: data.url,
            thumbnail: data.thumbnail,
            num_comments: data.num_comments,
            ups: data.ups,
            created_utc: data.created_utc,
            permalink: data.permalink,
            is_self: data.is_self,
        };
    });
}