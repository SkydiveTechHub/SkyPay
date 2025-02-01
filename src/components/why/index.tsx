import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';

interface SlideData {
  id: number;
  title: string;
  text: string;
}

const data: SlideData[] = [
  {
    id: 1,
    title: "24/7 Customer Support:",
    text: "We offer round-the-clock customer support, ensuring to assist your queries any time."
  },
  {
    id: 2,
    title: "99.9% Server Reliability:",
    text: "Rely on our consistent service without disruptions."
  },
  {
    id: 3,
    title: "Discounts Offers:",
    text: "Be prepared to enjoy discount offers to save up."
  },
  {
    id: 4,
    title: "Stable Pricing:",
    text: "We provide transparent pricing for accountability."
  },
  {
    id: 5,
    title: "Fastness and Convenient:",
    text: "Access easily to recharge airtime, buy data and pay your bills without hassle. "
  }, 
];

const Why: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = data.length;
  const autoScroll = true;
  let slideInterval: NodeJS.Timeout | null = null;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slideLength - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slideLength - 1 : prevSlide - 1));
  };

  useEffect(() => {
    if (autoScroll) {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [currentSlide, autoScroll]);

  return (
    <section id='why' 
    style={{
      backgroundImage:"url('/images/png/whyBg.jpg')",
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      backgroundPosition:'center',
      }}
    className=" w-full h-[270px] bg-pryColor flex justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center justify-center py-6 lg:w-[80%] lg:space-x-6">
        <div className='w-full lg:w-[50%]'>
          <h1 className="font-[inter] text-white opacity-50 font-[800] text-[32px] lg:text-[50px]">Why Skypay</h1>
        </div>
        <div className='flex w-full lg:w-[50%] flex-col mt-8 lg:mt-0'>
          <div className=' h-[80px] relative w-full lg:w-[80%]  '>
           {data?.map((item, index) => (
            <div className={index === currentSlide ? "slide current " : "slide"} key={item.id}>
                <p className="text-[#28C0F1] text-[16px] lg:text-[20px] font-[inter]">
                  <span className="text-[#fff] font-[600]"> {item.title}</span>
                  {item.text}
                </p>
            </div>
          ))}           
          </div>

          <div className="flex w-full space-x-4 lg:justify-end pt-6">
                <button onClick={prevSlide} className="w-[42px] h-[42px] rounded-full bg-[#fff] flex items-center justify-center">
                  <IoMdArrowRoundBack color={"#020d1e"} />
                </button>
                <button onClick={nextSlide} className="w-[42px] h-[42px] rounded-full bg-[#fff] flex items-center justify-center">
                  <IoMdArrowRoundForward color={"#020d1e"} />
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Why;
