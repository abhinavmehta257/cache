import { TwitterApi } from 'twitter-api-v2';
import connectDB from '../lib/connectDB';
import UserService from '@/model/userService';
import mongoose from 'mongoose';
import { verifyToken } from '../lib/verifyJWT';

const client = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

async function handler(req, res) {
  const user_id = req.user._id;
  const { state, code } = req.query;

  const codeVerifier = "C5QN1VrEyh8NGf.6EU9Ox5Om0RFmTr0AXOZS08QrKBVTH8_Vvq1cF8yH2_h-0Z~S_6K.bzJ~_GRwnEAx_yYMgL1tJeEPS_CfPZO33RHs2PcaSKf4adhpanN~3XT30Fx."
  const storedState = "PjqQCgQwwAbAUaVJEkiCw1.Pszyee_SO";

  if (state !== storedState) {
    return res.status(400).json({ message: 'State mismatch, possible CSRF attack' });
  }

  try {
    const { client: loggedInClient, accessToken, refreshToken, expiresIn } =
      await client.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/twitter/callback`,
      });

    await connectDB();

    const userDetails = await loggedInClient.v2.me();
    console.log(userDetails);
    
    const existingService = await UserService.findOne({
      user_name: userDetails.data.username,
    });

    if (!existingService) {
      const newService = new UserService({
        user_id: new mongoose.Types.ObjectId(user_id),
        user_name: userDetails.data.id,
        service_id: new mongoose.Types.ObjectId('66d988fd2ac34f51149d153d'),
        access_token: accessToken,
        refresh_token: refreshToken,
        token_expires_at: new Date(Date.now() + expiresIn * 1000),
      });

      await newService.save();
    } else {
      existingService.access_token = accessToken;
      existingService.refresh_token = refreshToken;
      existingService.token_expires_at = new Date(Date.now() + expiresIn * 1000);
      existingService.updated_at = new Date();

      await existingService.save();
    }

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during Twitter OAuth callback:', error);
    res.status(500).json({ message: 'Error during OAuth callback' });
  }
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));