import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddIcon from '@mui/icons-material/Add';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/router';
const BottomNavbar = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  
  const [value, setValue] = useState(slug);

  const changeHandler = (event, newValue) => {
    setValue(slug);
    router.replace('/dashboard/'+newValue);
  }
  useEffect(()=>{
    setValue(slug)
  })
  return (
    <BottomNavigation
      value={value}
      onChange={changeHandler}
      className="fixed bottom-0 left-0 max-w-[420px] mx-auto right-0 bg-dark-background"
    >
      <BottomNavigationAction
        value="home"
        icon={value === 'home' ? <HomeIcon className='text-primary-text dark:text-light-text' /> : <HomeOutlinedIcon style={{ color: '#4F7396' }} />}
        style={{ color: value === 'home' ? '#0D141C' : '#4F7396' }}
      />
      <BottomNavigationAction
        value="services"
        icon={value === 'services' ? <AddCircleIcon className='text-primary-text dark:text-light-text' /> : <AddCircleOutlineIcon style={{ color: '#4F7396' }} />}
        style={{ color: value === 'services' ? '#0D141C' : '#4F7396' }}
      />
      <BottomNavigationAction
        value="profile"
        icon={value === 'profile' ? <PersonIcon className='text-primary-text dark:text-light-text' /> : <PersonOutlinedIcon style={{ color: '#4F7396' }} />}
        style={{ color: value === 'profile' ? '#0D141C' : '#4F7396' }}
      />
    </BottomNavigation>
  );
};

export default BottomNavbar;
