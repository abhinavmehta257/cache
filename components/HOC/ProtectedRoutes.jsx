import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function ProtectedRoutes(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter(); // Hook called at the top level

    useEffect(() => {
      const token = Cookies.get('authToken');
      
      if (!token) {
        router.replace('/auth/signin'); // Correcting the route redirection
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = `ProtectedRoutes(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return Wrapper;
}

export default ProtectedRoutes;
