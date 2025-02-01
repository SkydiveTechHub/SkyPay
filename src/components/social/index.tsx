import React from 'react'

const SocialTabs = () => {
  return (
    <div>
      <p className='font-[600] font-int text-[14px]'>Follow Us On</p>
      <div style={{backgroundColor:'rgba(230, 235, 255, 1)'}} className='flex space-x-3 justify-center items-center w-full p-4'>
        <a href="https://www.facebook.com/profile.php?id=100085123170402&mibextid=ZbWKwL"><img src="images/png/facebook.png" alt="" /></a>
        <a href="https://instagram.com/SkyPay_ng?igshid=YTQwZjQ0NmI0OA=="><img src="images/png/instagram.png" alt="" /></a>
        <a href=""><img src="images/png/tiktok.png" alt="" /></a>
        <a href=""><img src="images/png/twitter.png" alt="" /></a>
      </div>
    </div>
  )
}

export default SocialTabs
