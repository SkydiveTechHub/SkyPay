import Link from 'next/link'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';

const WalletCheck = () => {
    const [show, setShow] = useState(false)
  return (
    <div className="rounded-[10px] bg-[#28C0F1] w-full md:w-[50%] lg:h-[250px] py-3 flex flex-row lg:flex-col justify-center lg:items-center px-4 lg:px-10 space-y-5 shadow-lg">

        <div className="flex flex-col lg:flex-row justify-between lg:justify-normal w-full lg:items-center">
            <small className="font-[600] text-[16px] font-int text-black lg:text-center">Wallet balance <button onClick={()=>setShow(!show)}>{show? <VisibilityOffIcon/> : <VisibilityIcon/>}</button></small>
            <div className="flex lg:justify-center items-center gap-3">
                <h2 className="text-center font-[800] text-[24px] lg:text-[32px] font-int text-black">{show ? `N 10000` : '*****'}</h2>
                
            </div>
        </div>
        
        <div className=" flex gap-6 items-center w-full">
            <Link href={''} className="text-white text-[12px] font-int flex items-center"><AddIcon/>Fund Wallet</Link>
            <Link href={''} className="hidden lg:flex text-white text-[12px] font-int  items-center"><img src='/images/png/Vectorshare.png' alt="share" /> Share Funds</Link>
            {/* <Link href={''} className="hidden lg:flex text-white text-[12px] font-int  items-center"><img src='/images/png/Vectorwithdraw.png' alt="share" /> Withdraw Commission</Link> */}
        </div>

    </div>

  )
}

export default WalletCheck