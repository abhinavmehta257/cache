import React, { useEffect, useState } from 'react';
import Signout from './blocks/SignOut';
import { BookmarkOutlined, BookOnlineOutlined, InfoOutlined, SaveAltOutlined } from '@mui/icons-material';

function Profile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Failed to fetch User');
        }
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='mt-4'>
      <h1 className="text-primary-text dark:text-light-text text-[28px] font-bold font-['Inter'] leading-[35px]">Profile</h1>

      {user ? (
        <form action="" method="post">
          <label
            className="mb-1 block text-sm font-medium text-light-text"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            defaultValue={user.username}
            className="p-[8px] focus:border-none border-dark-background rounded-[8px] w-full bg-dark-surface text-light-text"
            name='username'
          />
          <label
            className="mb-1 block text-sm font-medium text-light-text"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            defaultValue={user.email}
            name='email'
            className="p-[8px] focus:border-none border-dark-background rounded-[8px] w-full bg-dark-surface text-light-text"
          />
          <div className='flex mt-4 gap-4'>
            <button type='submit' className='bg-dark-surface px-4 py-2 rounded-[8px] text-white'> Update</button>
          </div>
        </form>
      ) : null}

      <div className='mt-4'>
        <a href='/support' className='flex items-center text-light-text hover:underline'>
          <InfoOutlined className='mr-2' /> Report Bug
        </a>
        <a href='/help' className='flex items-center text-light-text hover:underline mt-2'>
          <BookmarkOutlined className='mr-2' /> New service Request
        </a>
      </div>

      <Signout className='mt-4'/>
    </div>
  );
}

export default Profile;
