import React from 'react'
import MiniDrawer from './navbar'
import isAuth from '@/pages/Protected'


interface iProps {
    children : React.ReactNode
}

function Layout({children} : iProps) {
  return (
    <>
      <MiniDrawer children= {children} /> 

    </>
  )
}

export default isAuth(Layout)