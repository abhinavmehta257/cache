import Bookmarks from '@/components/Bookmarks';
import BottomNavbar from '@/components/BottomNavbar';
import ProtectedRoutes from '@/components/HOC/ProtectedRoutes';
import withAuth from '@/components/HOC/ProtectedRoutes';
import Profile from '@/components/Profile';
import Services from '@/components/Services';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();
  const { slug } = router.query;

  const renderComponent = () => {
    switch (slug) {
      case 'home':
        return <Bookmarks />;
      case 'services':
        return <Services />;
      case 'profile':
        return <Profile />;
      default:
        return <div>404 - Component not found</div>;
    }
  };

  return (
    <div className='px-[16px] py-[32px] dark:bg-dark-background h-[100vh] max-w-[420px] mx-[auto]'>
      {renderComponent()}
      <BottomNavbar/>
    </div>
  );
};

export default ProtectedRoutes(Dashboard);