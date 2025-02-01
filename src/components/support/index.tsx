import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";
import { Autoplay, Pagination } from 'swiper/modules';

const Support = () => {
    const supportData = ['/images/png/dstv-logo 1.png', '/images/png/Official_JAMB_logo-2 1.png', '/images/png/MTN-Logo 1.svg', '/images/png/ibedc-logo 1.png', '/images/png/Rectangle 4412.png', '/images/png/9mobile.png', '/images/png/mtn.png','/images/png/IbadanEDC.png','/images/png/IkejaEDC.png', '/images/png/JosEDC.png', '/images/png/smile.png','/images/png/spectranet.png','/images/png/startimes.png',]
  return (
    <div className='shadow-2xl py-6 px-4 lg:px-10 rounded-xl z-[999]'>
        <div className='flex '>
            <div className='w-full lg:w-1/2'>
                <p className='text-[#4F4F4F] text-center lg:text-left font-[500] lg:w-[90%]  font-int text-[18px] lg:text-[28px]'><span className='font-[700] text-[#22347F]'>Skypay</span> offers seamless services from over 30 top service providers, including:</p>
            </div>
            <div className='w-1/2 hidden lg:block'>

            </div>

        </div>
        <div className='w-full flex justify-center items-center  py-6'>
        <Swiper
                spaceBetween={0}
                centeredSlides={true}
                loop={true}
                // loopedSlidesLimit={false}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                breakpoints={{
                  375: {
                      slidesPerView: 3,
                  },
                  425: {
                      slidesPerView: 3,
                  },
                  768: {
                      slidesPerView: 5,
                  },
                  1024: {
                      slidesPerView: 8,
                  },
              }}
                // pagination={{
                //   clickable: true,
                // }}
                // navigation={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >

                {supportData.map((el, i) => (
                  <SwiperSlide key={i}>
                    {/* <div className=''> */}
                      <img src={el} className='w-[70px] h-[70px]' alt="support-logo" />
                      {/* </div> */}
                  </SwiperSlide>
                            ))
                  }



                

              </Swiper>
        </div>
    </div>
  )
}

export default Support