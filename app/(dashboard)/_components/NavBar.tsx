import MobileSideBar from './MobileSideBar'
import NavBarRoutes from '@/components/NavBarRoutes'

const NavBar = () => {
  return (
    <div className='h-full flex items-center px-4 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60'>
        <MobileSideBar/>
        <NavBarRoutes/>
    </div>
  )
}

export default NavBar