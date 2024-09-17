import React from 'react';
import { useRouter } from 'next/router';
import cookie from 'cookie';

const Signout = () => {
  const router = useRouter();

  const handleSignout = () => {
    // Remove cookies by setting their expiration date in the past
    document.cookie = cookie.serialize('authToken', '', {
      maxAge: -1, // Expire immediately
      path: '/',  // Ensure this applies across all pages
    });

    // Optionally, remove other cookies in the same way
    document.cookie = cookie.serialize('refreshToken', '', {
      maxAge: -1,
      path: '/',
    });

    // Redirect to login page or homepage after signout
    router.push('/auth/signin');
  };

  return (
    <>
      <button
        onClick={handleSignout}
        className="bg-red-500 text-white px-4 py-2 rounded-[8px] fixed bottom-20"
      >
        Sign Out
      </button>
    </>
  );
};

export default Signout;
