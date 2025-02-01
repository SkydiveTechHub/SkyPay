import React, {useEffect, useState} from 'react'
import CountUp from 'react-countup'

const CounterUp = () => {
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
    <div className='container flex justify-center items-center sm:my-[100px] '>
      <div className='flex flex-col md:flex-row w-full lg:w-[70%] justify-between items-center bg-[#F9F9F9] rounded-lg p-8 space-y-10 md:space-y-0'>
        <div>
            <h1 className='text-[#020d1e] font-[800] font-[inter] text-[24px] md:text-[36px]'>{<CountUp start={0} end={200000} duration={2} delay={0}/>}<span>+</span></h1>
            <p className='font-[500] md:font-[700] text-center md:text-left' > Customers</p>
        </div>
        <div>
            <h1 className='text-[#020d1e] font-[800] font-[inter] text-[24px] md:text-[36px]'>{<CountUp start={0} end={200} duration={2} delay={0}/>}<span>+</span></h1>
            <p className='font-[500] md:font-[700] text-center md:text-left' > Reviews</p>
        </div>
        <div>
            <h1 className='text-[#020d1e] font-[800] font-[inter] text-[24px] md:text-[36px]'>All in One</h1>
            <p className='font-[500] md:font-[700] text-center md:text-left' > Bills Payments</p>
        </div>
      </div>
    </div>
  )
}

export default CounterUp
