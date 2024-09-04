import { fetchRedditSaves } from "@/utils/getSaves";
import { getRedditToken } from "@/utils/redditData";

export default async function handler(req, res) {
    const {reddit_token,reddit_name} = await getRedditToken();
    const saves = await fetchRedditSaves(reddit_token,reddit_name);
    console.log(saves);
    res.json(saves);
}