import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Logo = () => {
  return (
   
    <Link href="/">
    <Image src="/logo.svg" height={60} width={60} alt='logo' />
 
    </Link>
   
  )
}

export default Logo