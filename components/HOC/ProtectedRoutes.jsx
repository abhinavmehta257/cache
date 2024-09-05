import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function WithAuth(WrappedComponent) {
  return (props) => {
    const Router = useRouter();

    useEffect(() => {
      const token = Cookies.get('authToken');
      
      if (!token) {
        Router.replace('/signin ');  // Redirect to login if not authenticated
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
