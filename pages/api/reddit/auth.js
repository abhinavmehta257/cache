// pages/api/reddit/auth.js

import { URLSearchParams } from 'url';

export default function handler(req, res) {
    const state = Math.random().toString(36).substring(7); // Generate a random state
    const params = new URLSearchParams({
        client_id: process.env.REDDIT_CLIENT_ID,
        response_type: 'code',
        state,
        redirect_uri: process.env.REDDIT_REDIRECT_URI,
        duration: 'permanent',
        scope: 'identity'
    });

    const authUrl = `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
    res.redirect(authUrl);
}