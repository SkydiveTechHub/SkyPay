import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import Layout from '@/components/layout/layout'
import { AuthProvider } from "@/context/authcontext/authcontext";
import React, {useEffect} from 'react'
import initializeAOS from "../../aosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from "./Protected";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    initializeAOS(); // Initialize AOS on the client-side
  }, []);
  return (
    <>
    <AuthProvider>
      <ToastContainer/>
        {Component.getLayout ? (
          Component.getLayout(<Component {...pageProps} />)
        ) : (
          <>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        )}
    </AuthProvider>

    </>
  );
}