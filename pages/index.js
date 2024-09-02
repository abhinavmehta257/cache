// pages/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (router.query.token) {
            toast.success('Token generated successfully!');
        }
    }, [router.query.token]);

    const handleRedditLogin = () => {
        router.push('/api/reddit/auth');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">Reddit OAuth 2.0 Example</h1>
            <button
                onClick={handleRedditLogin}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg"
            >
                Login with Reddit
            </button>
            <Toaster />
        </div>
    );
}
