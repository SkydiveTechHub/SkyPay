import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import CountUp from 'react-countup'
import DownloadBtn from '../shared/DownloadBtn'


interface DownloadProps {
    bgColor: String
}  

const Download = ({bgColor}:DownloadProps) => {

  
    const [countOn, setCountOn] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 1500) {
                setCountOn(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


  return (
        <section id='download'  style={{background: `${bgColor}`}}>
            <div className='container '>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='flex-1 flex flex-col space-y-6 text-center md:text-left'>
                    <h3 className='text-pryColor font-[inter] text-[28px] md:text-[38px] lg:text-[50px] md:leading-[60px] lg:leading-[73px] font-[700] lg:w-[80%] max-w-[450px] '>Download Skypay App</h3>
                    <p className='font-[inter] text-[#4F4F4F] text-[12px] md:text-[14px] lg:text-[18px] max-w-[492px] '>Enjoy promotional offers and discounts while experiencing stable pricing and a user-friendly platform.</p>
                    <div className='flex space-x-6 max-w-[472px] '>
                        <div className='w-1/2'>
                            <img src="images/svgs/Avatars.svg" alt="user group" />
                        </div>
                        <div className='w-1/2'>
                            <p className='font-[inter] font-[600] text-[#141F39] text-[16px] lg:text-[28px]'>{countOn && <CountUp start={0} end={200000} duration={2} delay={0}/>}<span>+</span></p>
                            <p className='font-[inter] text-[#4F4F4F] text-[12px] md:text-[14px] lg:text-[18px]'>Active and Happy Users</p>
                        </div>
                    </div>
                    {/* <div className='flex space-x-6 max-w-[474px] items-center '>
                        <div className='w-1/2'>
                            <a href=""><img src="images/svgs/gPlay.svg"  alt="google" /></a>
                            
                        </div>
                        <div className='w-1/2'>
                            <a href=""><img src="images/svgs/AppStore.svg" alt="apple" /></a>
                            
                        </div>
                            
                            
                        </div> */}

                    <DownloadBtn/>
                </div>
                <div className='flex-1 md:flex md:justify-center md:items-center' >
                    <img className='mx-auto' src='/images/png/heroPhone.png'width={500} height={610} alt='dashboard'/>
                </div>            
                </div>
            </div>


        </section>

  )
}

export default Download
