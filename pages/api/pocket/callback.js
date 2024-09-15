// pages/api/pocket/callback.js

import axios from 'axios';
import { verifyToken } from '../lib/verifyJWT';
import UserService from '@/model/userService';
import mongoose from 'mongoose';
import { saveToken } from '@/utils/redditData';

async function handler(req, res) {
  try {
    const user_id = req.user._id;
    const { code } = req.query; // Request token from query params
    console.log("code ",code);
    const { data } = await axios.post('https://getpocket.com/v3/oauth/authorize', {
      consumer_key: process.env.POCKET_CONSUMER_KEY,
      code,
    }, {
      headers: {
        'X-Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    const { access_token, username } = data;
    console.log(data);
    
    await saveToken(access_token,null,null,username,"66d988fd2ac34f51149d153d",user_id)
  
    res.redirect('/dashboard');

    res.status(200).json({ access_token, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error exchanging request token for access token' });
  }
}
export default (req, res) => verifyToken(req, res, () => handler(req, res));
