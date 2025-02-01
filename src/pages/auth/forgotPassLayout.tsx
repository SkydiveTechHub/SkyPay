import Footer from '@/components/footer';
import Homenav from '@/components/home/homenav/homenav';
import React, { ReactNode } from 'react';

interface LandingPageProps {
  img: string,
  title: string,
  desc?: string,
  children: ReactNode;
}

const ForgotPassLayout: React.FC<LandingPageProps> = ({ children, title, desc, img }) => {
  return (
    <div style={{backgroundImage:
    `url(${img})`, backgroundSize :"cover"}} className=' overflow-auto w-full min-h-screen flex py-6 '>
      <div className='flex-1 hidden md:block'>
      </div>
      <div className='flex-1 flex justify-center items-center w-full '>
        <div className='bg-[#D5EDF6] py-20 w-[90%] px-2 md:px-8 flex flex-col space-y-8 items-center justify-center rounded-md'>
          <div>
            <h2 className='font-[500] text-[#0B002A] text-center font-[inter] text-[18px]'>{title}</h2>
            <p className='text-center text-[#7B7B7B] font-[400] text-[10px] font-[inter]'>{desc}</p>
          </div>
          {children}
        </div>
        
      </div>
      
    </div>
  );
};

export default ForgotPassLayout;
