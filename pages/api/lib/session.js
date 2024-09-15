// lib/sessionOptions.js

export const sessionOptions = {
  password: process.env.SESSION_SECRET, // Set a strong secret in your .env file
  cookieName: 'twitter_oauth_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    httpOnly: true,
    sameSite: 'lax',
  },
};
