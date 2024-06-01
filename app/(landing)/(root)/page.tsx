"use client"

import { LandingContent } from "./_components/landing-content"
import { LandingHero } from "./_components/landing-hero"
import LandingNavBar from "./_components/landing-navbar"

const LandingPage=()=>{


    return(
        <div className="h-full">
            <LandingNavBar/>
            <LandingHero/>
            <LandingContent/>
          
        </div>
    )
}

export default LandingPage