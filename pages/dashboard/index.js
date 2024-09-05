import withAuth from '@/components/HOC/ProtectedRoutes'
import React, { useEffect } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BottomNavbar from '@/components/BottomNavbar';
import { Router, useRouter } from 'next/router';

function Dashboard() {
  const router = useRouter();
  useEffect(()=>{
    router.push('dashboard/home')
  })
  return (
    <div></div>
  )
}

export default withAuth(Dashboard)