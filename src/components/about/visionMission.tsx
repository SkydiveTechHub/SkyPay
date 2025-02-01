import React from 'react'

function Mission() {
  return (
    <div className='max-w-[1440px] mx-auto md:py-[10rem] py-[5rem] container '>
        <div className='flex flex-col-reverse space-y-4 md:flex-row justify-between items-center lg:px-20  md:space-x-6'>
            <div className='max-w-[456px]' data-aos="fade-right">
                <div className='text-[#020d1e] font-[inter] font-[800] text-[24px] md:text-[36px] '>
                    <p>Our Mission</p>
                </div>
                <div>
                    <p className='text-sm md:text-[18px]  text-[#4F4F4F]  font-[inter] ' > To make utility bill payments, airtime top-ups, 
                    and data purchases effortless, immediate, and accessible to everyone. 
                    We envisioned a world where these daily tasks could be completed 
                    with a few taps, without the hassle of long queues or 
                    complicated processes. 
                    </p>
                </div>
            </div>
            <div data-aos="fade-left">
            <img className=' rounded-lg md:rounded-[50px]' src="images/png/mision.png" alt="mision" />
            </div>
        </div>


        <div className='flex flex-col md:flex-row justify-between items-center lg:px-20 mt-[73px] md:space-x-4'>
            <div data-aos="fade-right">
                <img className=' rounded-lg md:rounded-[50px]' src="images/png/vision.png" alt="mision" />
            </div>

            <div className='max-w-[456px]' data-aos="fade-left">
                <div className='text-[#020d1e] font-[inter] font-[800] text-[24px] md:text-[36px] '>
                    <p>Our Vision</p>
                </div>
                <div>
                    <p className='text-sm md:text-[18px]  text-[#4F4F4F]  font-[inter] '> To become your reliable one-stop platform for your airtime, 
                    Data and paying of utility bills. Elevating your satisfaction as our esteemed users.  <br /><br />
                    Welcome on board! We're delighted to welcome you to 
                    our Skypay platform with more than 200,000 active users. 
                    </p>
                </div>
            </div>

        </div>
    </div>
  )
}
export default Mission


