import React from 'react'

interface proos {
    name: string,
    text:string,

}

function Card({name,text}:proos) {
  return (
    <div  className='sm:w-[100%] mx-auto w-[85%] max-w-[394px] sm:min-h-[294px] sm:max-h-auto max-h-[264px ]  p-[24px] sm:rounded-[24px] rounded-[13px] bg-[#fff] '>
        <div>
            <h2 className='font-poppins sm:text-[21px] text-[14px] pb-[8px] text-[#1E1E1E] font-[600] ' >{name}</h2>
            <img src='/images/svgs/stars.svg' />
        </div>

        <div className='mt-[24px]'>
            <p className='font-mul font-[500] sm:text-[16px] text-[10px] text-[#525252] sm:leading-[24px] leading-[13px]' >{text}</p>
        </div>
        
    </div>
  )
}

export default Card