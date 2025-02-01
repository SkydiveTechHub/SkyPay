import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ReactElement, useState } from 'react'
import HomePage from './home'
import ComingSoon from '@/components/comingSoon'
import NewHomePage from './home/newHome'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [soon, setSoon] = useState(false)
  return (
    <>
      {
        soon ? <ComingSoon/> : <HomePage/>
      }
      
    </>
  )
}

Home.getLayout = (Page :ReactElement )=>{
  return <>{Page}</>
}