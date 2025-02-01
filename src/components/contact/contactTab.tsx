import Image from 'next/image'
import React from 'react'

interface TabProps {
    image: string,
    title: string,
    text: string
}
const ContactTab = ({image, title, text}:TabProps) => {
    
  return (
    <div className='flex items-center flex-col md:flex-row'>
      <div className='md:p-6'>
        <img className='md:w-[30px] md:h-[30px] w-[25px] h-[25px]'  src={image} alt='icon'/>
      </div>
      <div className='border-l border-l-[#D9D9D9] pl-4 text-center md:text-left'>
        <h3 className='text-[poppins] font-[600] text-[12px] md:text-[16px] font-[inter] leading-[30px] text-[#414141]'>{title}</h3>
        <p className='text-[poppins] text-[10px] md:text-[14px] text-[#414141]'>{text}</p>
      </div>
    </div>
  )
}

export default ContactTab
