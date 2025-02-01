import About from '@/components/about'
import LandingPageLayout from '@/components/layout/landingPageLayout'
import React, {ReactElement} from 'react'

export default function AboutPage(){
  return (
    <LandingPageLayout>
      <About/>
    </LandingPageLayout>
  )
}



AboutPage.getLayout = (Page :ReactElement )=>{
  return <>{Page}</>
}