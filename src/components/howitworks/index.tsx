import React from 'react'
import Button from '@/components/shared/Button/button';
import { useRouter } from 'next/router';

    
const HowItWorks = () => {
  const router = useRouter()
    
    interface   WorkProps {
        id: String;
        title: String;
        desc: String
    }  

    const WorkBox = ({id, title, desc}:WorkProps) =>{
        return(
            <div className='flex md:flex-col items-center md:items-start w-full sm:w-[400px] px-4 gap-2 md:gap-8 hover:shadow-lg'>
                <div className='w-full flex md:justify-center md:items-center '>
                    <span  className=' border-[4px] rounded-full px-5 py-3 border-[#22347F] font-[500] text-[#22347F] bg-white text-[16px] '>{id}</span>
                </div>
                
                <div className='space-y-3 md:space-y-2'>
                    <div className='text-[#22347F] text-[20px] md:text-[24px] text-left font-int font-[700] '>Step {id}: {title}</div>
                    {/* <div className='h-[1px] bg-[#22347F] w-full md:w-[80%]'></div> */}
                    <div className='text-[#4F4F4F] text-[14px] text-left font-[400] font-int'>{desc}</div>
                </div>
            </div>
        )
    }
    
    
      return (
            <section id='howitworks' className='py-6'>
                <div className='container '>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div className='w-full md:w-1/4 flex flex-col space-y-6 text-center md:text-left'>
                            <h1 className='font-int font-[700] text-[#22347F] text-[32px] md:text-[40px]'>How It Works in Just Three Steps</h1>
                        </div>
                        <div className='w-full md:w-3/4 md:flex md:justify-center md:items-center' >
                            <img className='mx-auto' src='/images/svgs/abt2.svg' width={300}  alt='dashboard'/>
                        </div>            
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row justify-center text-center md:text-left relative z-[-1] gap-4'>
                    <div className='hidden lg:block h-[4px] bg-[#22347F] w-[60%] absolute top-[25px] left-[16.5rem] z-[-1]'></div>
                        {
                            workdata.map((i)=>{
                                return(
                                    <WorkBox
                                        key={i.id}
                                        id={i.id}
                                        title={i.title}
                                        desc={i.desc}
                                    />
                                )
                            })
                        }


                    </div>
                <div className='w-full flex justify-center items-center py-10 gap-6'>
 
                    <div onClick={()=> router.push('/login')}>
                    <Button
                        px='12px'
                        py='12px'
                        width={'136px'}
                        height={'47px'}
                        bgcolor='transparent'
                        border='2px solid #22347F'
                        fontsize={'15px'}
                        fontWeight={700}
                        textColor='#22347F'
                        text='Sign In'
                        rounded='9px'
                    />
                    </div>
                    <span className='font-bold text-primary'>OR</span>
                    <div onClick={()=> router.push('/register')}>
                    <Button
                        px='12px'
                        py='12px'
                        width={'136px'}
                        height={'47px'}
                        bgcolor='#22347F'
                        border='2px solid #22347F'
                        fontsize={'15px'}
                        fontWeight={700}
                        textColor='#fff'
                        text='Get Started'
                        rounded='9px'
                    />                
                    </div>
                </div>
    
            </section>
    
      )
    }

    

export default HowItWorks


const workdata = [

    {
        id: '1',
        title:'Sign Up for Free ',
        desc:"Follow our quick and easy sign-up process. Just provide your basic personal information, and you're good to go!"
    },
    {
        id: '2',
        title:'Add Funds',
        desc:"Once you've signed in, you can effortlessly add funds to your account ! "
    },
    {
        id: '3',
        title:'Pay Bills Seamlessly',
        desc:"Bravo. You can start paying your bills, buy data and airtime with no stress. It's that simple! "
    },
]