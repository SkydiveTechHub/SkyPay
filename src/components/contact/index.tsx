import React from 'react'
import ContactTab from './contactTab'

interface ContactProps {
    title: string,
}

const list = [
    {
        imgLink: 'images/svgs/phoneIcon.svg',
        title:'PHONE',
        text:'091-1444-1444'
    },
    {
        imgLink: 'images/svgs/mapIcon.svg',
        title:'ADDRESS',
        text:'Ibadan, Nigeria'
    },
    {
        imgLink: 'images/svgs/mailIcon.svg',
        title:'EMAIL',
        text:'customersupport@Skydive Tech Hub.com'
    },
]

const Contact = ({title}:ContactProps) => {
  return (
    <section id='contact'  className='w-full bg-[#FFF] container  py-10  max-w-[1440px] mx-auto' data-aos="zoom-in-left" data-aos-easing="ease-in" data-aos-duration="600">
      <div className='flex justify-center items-center gap-4 mb-10'>
        <div className='bg-[#020d1e] h-[5px] w-[5px] rounded-[50%]'></div>
        <div><h3 className='text-[#020d1e] font-[700] text-[32px]'>{title}</h3></div>
        <div className='bg-[#020d1e] h-[5px] w-[5px] rounded-[50%]'></div>
      </div>

      <div className='flex flex-col md:flex-row w-full justify-between lg:justify-around py-8 space-y-8 md:space-y-0'>
        <div className='flex flex-wrap md:flex-nowrap md:flex-col justify-center gap-6 md:gap-0 md:justify-normal md:space-y-12' >
            {
                list?.map((item, index)=><ContactTab key={index} image={item.imgLink} title={item.title} text={item.text}/>
                )
            }
        </div>
        <div className='w-[100%] md:w-[60%]'>
            <form className='flex flex-col gap-6'>
                <div className='flex flex-col md:flex-row justify-between w-full gap-6'>
                    <input className='border rounded-[5px] border-[#441144B2] p-2 md:p-5 w-full md:w-1/2' type="text" placeholder='Name' />
                    <input className='border rounded-[5px] border-[#441144B2] p-2 md:p-5 w-full md:w-1/2' type="email" placeholder='Email' />
                </div>
                <div>
                    <input className='border rounded-[5px] border-[#441144B2] p-2 md:p-5 w-full' type="text" placeholder='Subject' />
                </div>

                <div>
                    <textarea className='border rounded-[5px] border-[#441144B2] p-2 md:p-5 w-full h-[170px]' name="" placeholder='Message' id=""></textarea>
                </div>

                <div className='flex w-full items-center'>
                    <input type="submit" value='Send' className='bg-[#020d1e] text-[#fff] font-[700] font-[inter] px-[17px] py-[16px] w-[180px] rounded-lg' />
                </div>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
