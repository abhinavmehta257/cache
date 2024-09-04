// pages/api/reddit/callback.js

import { saveRedditToken } from '@/utils/redditData';
import axios from 'axios';

export default async function handler(req, res) {
    const { code, state } = req.query;

    if (!code || !state) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        const { access_token, refresh_token, expires_in } = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDDIT_REDIRECT_URI,
            }).toString(),
            {
                auth: {
                    username: process.env.REDDIT_CLIENT_ID,
                    password: process.env.REDDIT_CLIENT_SECRET,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        ).then(res=>{return res.data});
        
        const {name} = await fetch('https://oauth.reddit.com/api/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        }).then(res=>{return res.json()})

        
        // Redirect to the homepage with success message
        await saveRedditToken(access_token, refresh_token, expires_in,name,service_id,auth_token);
        res.redirect(`/?token=${access_token}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Token exchange failed' });
    }
}
