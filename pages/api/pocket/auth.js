// pages/api/pocket/auth.js

import axios from 'axios';
import { verifyToken } from '../lib/verifyJWT';

async function handler(req, res) {
  if(req.method !="GET"){
      return res.status(403).json({message:"Message not allowed"});
  }
  const redirect_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/pocket/callback`
  try {
    const { data } = await axios.post('https://getpocket.com/v3/oauth/request', {
      consumer_key: process.env.POCKET_CONSUMER_KEY,
      redirect_uri: redirect_url
    }, {
      headers: {
        'X-Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const requestToken = data.code;

    // Redirect user to Pocket authorization URL
    res.redirect(`https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${redirect_url}?code=${requestToken}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting request token' });
  }
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));