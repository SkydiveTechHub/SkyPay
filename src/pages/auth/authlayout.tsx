import Footer from '@/components/footer';
import Homenav from '@/components/home/homenav/homenav';
import React, { ReactNode } from 'react';

interface LandingPageProps {
  img: string,
  title: string,
  desc?: string,
  children: ReactNode;
  type?:string
}

const AuthLayout: React.FC<LandingPageProps> = ({ children, title, desc, img, type }) => {
  return (
    <div style={{backgroundImage:
    `url(${img})`, backgroundSize :"cover"}} className=' overflow-auto w-full min-h-screen flex py-6 '>
      <div className={`flex-1 hidden ${type === 'register' ?'hidden':'lg:block'}`}>
      </div>
      <div className='flex-1 flex justify-center items-center w-full '>
        <div className='bg-[#FAFAFA] py-20 w-[95%] md:w-[80%] lg:px-8 flex flex-col space-y-8 items-center justify-center'>
          <img src="images/svgs/authLogo.svg" alt="" />
          <div>
            <h2 className='font-[700] text-center font-[inter] text-[16px] md:text-[28px]'>{title}</h2>
            <p className='hidden text-center font-[500] text-[13px] w-[80%] md:text-[20px] font-[inter]'>{desc}</p>
          </div>
          {children}
        </div>
        
      </div>
      
    </div>
  );
};

export default AuthLayout;
