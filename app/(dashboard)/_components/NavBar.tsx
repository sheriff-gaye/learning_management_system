import React from 'react'
import MobileSideBar from './MobileSideBar'
import NavBarRoutes from '@/components/NavBarRoutes'

const NavBar = () => {
  return (
    <div className='p-4 border-b h-full  flex  items-center shadow-sm bg-white dark:bg-background'>
        <MobileSideBar/>
        <NavBarRoutes/>

    </div>
  )
}

export default NavBar