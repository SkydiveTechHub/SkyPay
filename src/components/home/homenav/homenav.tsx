import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';

import Text from '@/components/shared/Text/text';
import Button from '@/components/shared/Button/button';
import DrawerNav from './drawer';
import { useRouter } from 'next/router';

function Homenav() {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (id : any) => {
    setActiveLink(id);
  };

  const handleLinkMouseEnter = (id  : any) => {
    setActiveLink(id);
  };

  const handleLinkMouseLeave = () => {
    setActiveLink(null);
  };

  const links = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'About us',
      path: '/about',
    },
    {
      id: 3,
      name: 'Services',
      path: '/#service',
    },
    {
      id: 4,
      name: 'Testimonials',
      path: '#testimonial',
    },
    {
      id: 5,
      name: 'Contact Us',
      path: '/contact',
    },
  ];

  return (
    <div className='fixed w-[100%]  z-[200]  h-[80px] ' >
      <div className='lg:shadow-lg w-[100%]  lg:px-[50px] px-[20px]  lg:rounded-[100px] lg:bg-[#fff] bg-[#020d1e] lg:py-[10px] py-[15px] lg:mt-[27px] max-w-[1440px] mx-auto'>
        <div className='flex justify-between items-center'>
          {/* <div className='flex gap-[80px]'> */}
            <div className='hidden lg:block'>
              <Image  width={152} height={28} src={'/images/png/LOGO.png'} alt='logo' />
            </div>
            <div className='lg:hidden'>
              <Image width={152} height={28} src={'/images/png/LOGOF.png'} alt='logo' />
            </div>

            <div className='lg:flex hidden'>
              {links?.map((item) => (
                <div key={item.id} 
                    onClick={() => handleLinkClick(item.id)}
                    onMouseEnter={() => handleLinkMouseEnter(item.id)}
                    onMouseLeave={handleLinkMouseLeave}
                >
                  <Link href={item.path}>
                    <Text
                      px='15px'
                      py='25px'
                      color={activeLink === item.id ? '#28C0F1' : '#141F39'}
                      weight='400'
                      family='inter'
                      text={item.name}
                    />
                  </Link>
                </div>
              ))}
            </div>
          {/* </div> */}
          <div className='lg:flex hidden gap-[30px]'>
            <div onClick={()=> router.push('/login')}>
              <Button
                px='12px'
                py='12px'
                width={'136px'}
                height={'47px'}
                bgcolor='transparent'
                border='2px solid #020d1e'
                fontsize={'15px'}
                fontWeight={700}
                textColor='#020d1e'
                text='Login'
                rounded='9px'
              />
            </div>
            <div onClick={()=> router.push('/register')}>
              <Button
                px='12px'
                py='12px'
                width={'136px'}
                height={'47px'}
                bgcolor='#020d1e'
                border='2px solid #020d1e'
                fontsize={'15px'}
                fontWeight={700}
                textColor='#fff'
                text='Sign up'
                rounded='9px'
              />                
            </div>
            {/* <div onClick={()=> router.push('/')}>
            <button className='px-[20px] py-[12px] h-[47px] bg-[#020d1e] border-2 border-[#020d1e] text-[#fff] font-[500] rounded-[9px]'>Download App <EastIcon/></button>

            </div> */}

          </div>
          <div className='lg:hidden block'>
            <DrawerNav />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homenav;
