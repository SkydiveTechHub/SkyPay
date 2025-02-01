import Contact from "@/components/contact";
import Services from "@/components/service";
import Footer from '@/components/footer'
import Hero from '@/components/home/homenav/hero'
import Homenav from '@/components/home/homenav/homenav'

import Testimonial from '@/components/testimonials/testimonial';
import React, {useEffect} from 'react'
import initializeAOS from '../../../aosConfig'
import Download from '@/components/download';
import Why from "@/components/why";
import LandingPageLayout from "@/components/layout/landingPageLayout";
import Support from "@/components/support";
import HowItWorks from "@/components/howitworks";
import NewFaq from "@/components/faq/NewFAQ";

const HomePage = () => {

  return (
      <LandingPageLayout>
        <div style={{
          backgroundImage:"url('/images/png/heroBg.jpg')",
          backgroundRepeat:'no-repeat',
          backgroundSize:'cover',
          backgroundPosition:'center',
          }} className="z-[-1]">
          <div className='max-w-[1440px]  mx-auto'>
              <Hero/>
          </div>
        </div>
        {/* <div className="z-[-1]">
          <Support/>
        </div> */}
        
        <Services />
        <div style={{background:'rgba(40, 192, 241, 0.11)'}}>
        <HowItWorks/>       
        </div> 
        <Why/>
        {/* <Download bgColor={"#fff"}/> */}
        <Testimonial/>
        <div style={{background:'rgba(40, 192, 241, 0.11)'}}>
        <NewFaq/>        
        </div>   
        {/* <Contact title='Contact Us'/> */}
      </LandingPageLayout>
  )
}

export default HomePage;
