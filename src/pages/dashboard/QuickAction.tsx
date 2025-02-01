import FundCard from '@/components/dashboard/fundCard'
import QuickRecharge from '@/components/dashboard/inputwithEdit'
import SocialTabs from '@/components/social'
import { AuthContext } from '@/context/authcontext/authcontext'
import usePost from '@/hooks/usePost'
import { Grid } from '@mui/material'
import React, { useContext } from 'react'

const QuickAction = () => {
  const auth = useContext(AuthContext)
  const api_key = auth?.userData?.api_key

  const {myData} = usePost({
    "process": "tp_recurring_services",
    "api_key": api_key
})

  return (
    <div className='w-full flex flex-col gap-10'>
        <p className='font-int font-[600] text-center'>Recurring Payments</p>
        <Grid sm={12}>
            <QuickRecharge/>
          </Grid>
          <Grid sm={12}>
            <FundCard/>
          </Grid>
    </div>
  )
}

export default QuickAction