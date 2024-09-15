import { verifyToken } from '../lib/verifyJWT';

const { google } = require('googleapis');

async function handler(req,res){
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUR_CLIENT_SECRET,
        'https://animated-space-journey-r6qjxrppjpq3594p-3000.app.github.dev/api/youtube/callback'
      );
    const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
      });
    res.redirect(url);
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));
