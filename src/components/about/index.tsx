import React from 'react'
import Download from '../download'
import CounterUp from './countUp'
import Mission from './visionMission'

const About = () => {
  return (
    <div>
        <section style={{background:"rgba(40, 192, 241, 0.11)"}} className=' pt-10 md:pt-[120px]'>
        <div className='container flex justify-center items-center flex-col gap-8'>
            <h3 className='text-[#020d1e] text-[28px] md:text-[45px] font-[700] font-[inter] '>About our Company</h3>
            <p className='text-[#333333] font-[inter] max-w-[727px] mx-auto '><span className='text-[#22347F] font-[700] '>Skypay</span> is more than just a digital platform; it's a seamless solution to your everyday needs. As a subsidiary of <span className='font-[700]' >Skydive Tech Hub</span>, we were born from a passion for simplifying your life.</p>

            <div className='flex space-x-4 md:space-x-10 md:mt-[29px] '>
                <div className='md:w-2/3' data-aos="zoom-out">
                    <img className='w-full h-full rounded-lg' src="images/svgs/abt1.svg" alt="" />
                </div>
                <div className='md:w-1/3' data-aos="zoom-out">
                    <img className='w-full h-full rounded-lg' src="images/svgs/abt2.svg" alt="" />
                </div>
            </div>

            <div className='flex justify-between md:gap-12 md:mt-[42px] flex-col md:flex-row' data-aos="fade-up">
                <h4 className='text-[#020d1e] font-[inter] font-[600] text-[18px] md:text-[24px] '>What we do</h4>
                <p className='max-w-[626px] mx-auto'>Welcome to Skypay! A delightful platform for your day-to-day utility needs. Catering for your daily needs is our priority.  <br />
                Get started to recharge airtime, subscribe data plans and pay your bills easily. Port to Skypay today!</p>
            </div>
        </div>
        </section>
        <CounterUp/>
        <div data-aos="flip-up">
            <Download bgColor={"rgba(40, 192, 241, 0.11)"}/>
        </div>
        
        <Mission/>
    </div>

  )
}

export default About
