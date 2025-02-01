import React, {ReactElement} from 'react'
import Swipe from './swiper'
import Mobileswipper from './mobileswipper'

function Testimonial() {
  return (
    <div id='testimonial'  data-aos="slide-up" data-aos-easing="ease" data-aos-duration="600">
        <div className='max-w-[1440px] mx-auto sm:pt-[106px] pt-[57px] sm:pb-[42px] pb-[30px] sm:px-[40px] ' >
            <h1 className='text-[#020d1e] text-center font-int sm:text-[61px] text-[26px] font-[600] sm:leading-[50px] leading-[21px] sm:tracking-[0.146px] tracking-[0.063px] ' >Testimonials</h1>
            <div className='mt-[49px]  mx-auto sm:block hidden ' >
                <Swipe/>
            </div>
            <div className='sm:hidden block mt-[49px] '>
                <Mobileswipper/>
            </div>
        </div>
        
    </div>
  )
}



export default Testimonial

Testimonial.getLayout = (Page :ReactElement )=>{
  return <>{Page}</>
}