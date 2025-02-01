

"use client";
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/authcontext/authcontext';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = useContext(AuthContext);
    // const isAuthenticated = auth.isLoggedIn;
    const isAuthenticated = true;
    const router = useRouter();  // Use useRouter instead of useNavigate
    const path = router.pathname;


    useEffect(() => {
      if (!isAuthenticated && path.includes('/dashboard')) {
        console.log(auth)
        console.log('auth', isAuthenticated)
        router.push('/login');  // Use router.push instead of navigate
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
