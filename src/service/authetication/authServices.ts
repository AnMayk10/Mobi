import { auth } from "../../config/config"
import { prisma } from "../../libs/prisma"
import {sign} from 'jsonwebtoken'
import { validationLoginInput } from "../validation/input"


export const authUser = async(data:{email : string, password:string}):Promise<{token:string}>=>{
      
    if(!validationLoginInput(data)){
        throw new Error("data invalid");
    }

    
    const user = await prisma.users.findUnique({
        where:{
            email: data.email
        }
      })

    
      if(!user || !user.password){
         throw new Error("user not found")
      }

      const token = sign({
        id: user.id,
        login: user.name,
        email: user.email
      },
      auth.secret,
      {
        expiresIn: "1h",
      })

      return {token}

   
}

