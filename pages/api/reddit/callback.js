// pages/api/reddit/callback.js

import axios from 'axios';

export default async function handler(req, res) {
    const { code, state } = req.query;

    if (!code || !state) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        const response = await axios.post(
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
        );

        const { access_token, refresh_token, expires_in } = response.data;

        // You can store the tokens in the session or database as needed

        // Redirect to the homepage with success message
        res.redirect(`/?token=${access_token}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Token exchange failed' });
    }
}
