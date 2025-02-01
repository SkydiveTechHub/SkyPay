import Footer from '@/components/footer';
import Homenav from '@/components/home/homenav/homenav';
import React, { ReactNode } from 'react';

interface LandingPageProps {
  children: ReactNode;
}

const LandingPageLayout: React.FC<LandingPageProps> = ({ children }) => {
  return (
    <div className=' overflow-hidden w-full'>
      <div className='w-[90%]'>
        <Homenav/>
      </div>
      
      {children}
      <Footer/>
    </div>
  );
};

export default LandingPageLayout;
