// pages/api/auth/callback.js

import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const redirect_uri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;

    // Exchange authorization code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, id_token } = tokenResponse.data;

    // Decode the ID token to get user information
    const decoded = jwt.decode(id_token);

    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      sub: decoded.sub, // Google user ID
    };

    // Create JWT payload
    const token = jwt.sign(
      {
        user,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token validity
    );

    // Set JWT in HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'strict',
        path: '/',
      })
    );

    // Redirect to homepage or desired page
    res.redirect('/');
  } catch (error) {
    console.error('Error exchanging code for tokens:', error.response?.data || error.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
