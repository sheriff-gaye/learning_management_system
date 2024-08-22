import { UserProfile } from "@clerk/nextjs"


const ProfilePage=()=>{

    return <UserProfile   appearance={{
        elements: {
          rootBox: {
            boxShadow: "none",
            width: "100%"
          },
          card: {
           
            boxShadow: "none",
           
          }
        }
      }}/>
}

export default ProfilePage