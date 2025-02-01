import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DownloadBtn = () => {
  return (
    <div className='flex gap-6'>
        <Link href={'/'}><img className='w-[180px] h-[50px]' alt='download' src={'/images/png/App Store.png'}/></Link>
        <Link href={'/'}><img className='w-[180px] h-[50px]' alt='download' src={'/images/png/Google Play.png'}/></Link>
    </div>
  )
}

export default DownloadBtn