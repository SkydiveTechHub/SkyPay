import { AuthContext } from '@/context/authcontext/authcontext'
import React, { useContext, useEffect, useState } from 'react'
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';

const UserDetails = () => {
    const auth = useContext(AuthContext)
    const userInfo = auth?.userData
    const [Greeting, setGreeting] = useState('')

    useEffect(()=>{
        function determineTimeOfDay() {
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                 setGreeting("Good Morning");
            } else if (currentHour < 17) {
                setGreeting("Good Afternoon");
            } else {
                setGreeting("Good Evening");
        }
        }
        
        const timeOfDay = determineTimeOfDay();
    }, [])
  return (
    <div>
        <div className='flex items-center gap-2'>
            <p className='font-[inter] font-[700] text-[16px]' style={{color:'rgba(28, 27, 27, 1)'}}>{Greeting}, {userInfo?.username}</p>
            {Greeting === 'Good Morning' ? <CloudIcon sx={{color:'#28c0f1'}}/> : Greeting === 'Good Afternoon' ? <WbSunnyIcon sx={{color:'rgba(253, 182, 19)'}}/>: <NightsStayIcon color='disabled'/>}
        </div>
        <div>
            <p className='font-[600] font-[inter] text-[14px]' style={{color:'rgba(34, 52, 127, 1)'}}>
            <span>Wallet Balance: ₦{userInfo?.wallet_balance ?? 0}</span> 
            <span style={{color:'rgba(0, 0, 0, 1)'}}> | </span> 
            <span>Commission: ₦{userInfo?.bonus_balance ?? 0}</span>
            </p>

        </div>
      
    </div>
  )
}

export default UserDetails
