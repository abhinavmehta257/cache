import { saveToken } from '@/utils/redditData';
import { verifyToken } from '../lib/verifyJWT';

const { google } = require('googleapis');

async function handler(req,res){
    const user_id = req.user._id
    const code = req.query.code;
    const error = req.query.error;

    if(error == 'access_denied'){
        return res.redirect('/dashboard');
    }

    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUR_CLIENT_SECRET,
        'https://animated-space-journey-r6qjxrppjpq3594p-3000.app.github.dev/api/youtube/callback'
      );
    const { tokens } = await oauth2Client.getToken(code);
    const redditToken = await saveToken(tokens.access_token, tokens.refresh_token, tokens.expiry_date,user_id,"66d988fd2ac34f51149d153c",user_id);
    if(!redditToken){
        return res.status(500).json({message:"Internal server error"})
    }
    console.log(tokens);

    res.redirect(`/dashboard/services?token=${tokens.access_token}`);
    
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));


