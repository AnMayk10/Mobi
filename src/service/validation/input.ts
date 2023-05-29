import { UUID } from "crypto"
import type{ UserDataInput } from "../../types/singin"
import {z} from 'zod'


const userSchema = z.object({
    name: z.string({description: "name invalid or null"}),
    email: z.string({description: "email invalid or null"}).email(),
    password: z.string(),
    telephone: z.object({
        number: z.number({description: "number telephone invalid or null"}).min(9).max(9),
        area_code: z.number({description: "area_code or null"}).min(2).max(2)
    })
})

const loginSchema= z.object({
        email: z.string().email(),
        password:z.string()
    })


export type Login = z.infer<typeof loginSchema>

export type User = z.infer<typeof userSchema>

export const validationUserInput =(user : User):boolean=>{  
    try {
        
        if(user=== null ){
            return false;
        }

        return true;
    } catch (error) {
        return false
    }
}

export const validationLoginInput = (login : Login):boolean=>{
     try {
        if(typeof login !== "object" || login === null){
            return false;
        }

        return true;
     } catch (error) {
          return false;       
     }
}

export const validationUserId=(id:string):boolean=>{
    try{
    if(id == null){
        
        return false;
     }

     return true;
    }catch(e){
       return false
     }
}