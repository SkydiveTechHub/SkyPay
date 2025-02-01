import React from 'react'

const AccountCheck = () => {
  return (
    <div className="rounded-[10px] bg-[#FCFCFD] w-full  min-h-[250px]  shadow-lg">

        <div className="w-full border-b">
            <p className="text-center font-int py-3 text-[#990D81] font-[500]">Account Information</p>
        </div>
        
        <div className="px-8">
            <div className="flex items-center py-4">
                <div>
                    <img src="/images/png/Groupwema.png" alt="" />
                </div>
                <div>
                    <p className="font-[800] text-[32px] text-[#990D81] font-int">0112233445</p>
                    <small style={{color:'rgba(82, 82, 108, 0.8)'}} className='font-int text-[12px] font-[400]'>Oladipo Faith</small>
                </div>
            </div>
            <div className="flex flex-col ">
                <div className="flex-1">
                    <p className='font-int font-[600] text-[13px] text-black'>Payment Methods</p>
                    <p className='hidden font-int font-[400] text-[11px] text-black'>Click to make payment</p>
                </div>

                <div className="flex-1 flex space-x-2">
                    <button className="bg-[#132FA0] w-[150px] text-white rounded-md font-[600] text-[13px] px-3 py-2">ATM/DEBIT CARD</button>
                    <button className="bg-[#132FA0] w-[150px] text-white rounded-md font-[600] text-[13px] px-3 py-2">BANK TRANSFER</button>
                </div>
            </div>
        </div>


    </div>
  )
}

export default AccountCheck