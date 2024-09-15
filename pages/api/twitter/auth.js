import { TwitterApi } from 'twitter-api-v2';
import { verifyToken } from '../lib/verifyJWT';

const client = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

async function handler(req, res) {
  try {
    const { url, codeVerifier, state } = await client.generateOAuth2AuthLink(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/twitter/callback`,
      { scope: ['tweet.read', 'users.read', 'offline.access','bookmark.read'] }
    );

    // Store the codeVerifier and state in session
    req.codeVerifier = codeVerifier;
    req.state = state;
    console.log(state,codeVerifier);
    
    res.redirect(url);
  } catch (error) {
    console.error("Error during Twitter OAuth:", error);
    res.status(500).json({ message: 'Error generating OAuth URL' });
  }
}
export default (req, res) => verifyToken(req, res, () => handler(req, res));