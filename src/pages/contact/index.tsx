import Contact from "@/components/contact";
import Download from "@/components/download";
import LandingPageLayout from "@/components/layout/landingPageLayout";
import React from "react";
import { ReactElement } from "react";


export default function ContactUs (){
  return (
    <LandingPageLayout>
        <div className='pt-24'>
            <Contact title='Get in Touch today!'/>
            <Download bgColor={"rgba(40, 192, 241, 0.11)"}/>            
        </div>

    </LandingPageLayout>
  )
}

ContactUs.getLayout = (Page: ReactElement) => {
	return <>{Page}</>;
};
