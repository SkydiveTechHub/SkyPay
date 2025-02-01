import { NextResponse, NextRequest } from 'next/server'
import { AuthContext } from '@/context/authcontext/authcontext';
import { useContext } from 'react';

const protectedRoutes = ["/dashboard"];

export default function middleware(req: NextRequest) {
    const auth = useContext(AuthContext)
    const isAuthenticated = auth.isLoggedIn
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}