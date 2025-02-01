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
import HowItWorks from "@/components/howitworks";
import Faq from "@/components/faq";
import NewFaq from "@/components/faq/NewFAQ";
import Support from "@/components/support";

const NewHomePage = () => {

  return (
      <LandingPageLayout>
        <div  className="bg-[url('/images/png/topRec.png')] bg-no-repeat bg-cover  bg-center z-[-1]" >
          <div className='max-w-[1440px]  mx-auto z-[-1]'>
              <Hero/>
          </div>
        </div>
        <div className="px-[2rem] lg:px-[7rem] mt-[3rem] z-[999]">
          <Support/>
        </div>
        
        <Services />
        <Why/>
        <div style={{background:'rgba(40, 192, 241, 0.11)'}}>
        <HowItWorks/>       
        </div> 
        
        <Testimonial/>  
        <div style={{background:'rgba(40, 192, 241, 0.11)'}}>
        <NewFaq/>        
        </div>    

        <Download bgColor={"#fff"}/>
        {/* <Contact title='Contact Us'/> */}
      </LandingPageLayout>
  )
}

export default NewHomePage;
