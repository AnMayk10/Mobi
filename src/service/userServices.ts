import { encode } from "punycode";
import  {prisma}  from "../libs/prisma";
import type{ UserDataInput, UserDateOutput } from "../types/singin";
import { User, validationUserId, validationUserInput } from "./validation/input";
import { throws } from "assert";
import { Prisma, Users } from "@prisma/client";
import { authUser } from "./authetication/authServices";
import { DataUserOutput } from "../types/userOutput";
import {sign} from 'node:crypto'
import { createCipheriv, randomBytes } from "crypto";

export const service ={
    async getUser(id: string) :Promise<DataUserOutput>{
     
      const user = await prisma.users.findFirst({
        where:{
          id:{
            equals:id
          }
        },
      })
        
      if(!user){
        throw new Error("user not exists ")
      }

      const userOutput:DataUserOutput={
          id: user.id,
          email: user.email,
          telephone:user.telephone,
          created_at: user.created_at!,
          modified_at: user.modified_at!
      }

      return userOutput;

    },

    async singIn(login:{email:string, password: string}):Promise<string>{
       const {token} = await authUser(login);
        
       if(!token){
        throw new Error("not found")
       }

       return token
     },

    async signUp(user : User):Promise<UserDateOutput >{
       if(!validationUserInput(user)){
          throw new Error( "input invalid");
       }

       const telephone=[{
        number:user.telephone.number ,
        area_code: user.telephone.area_code,
    }] as Prisma.JsonArray

       const passwordEncode = createCipheriv("aes-256-cbc",randomBytes(16),user.password.trim());

       prisma.$connect();


       const userCreated = await prisma.users.create({
        data:{
            name: user.name,
            email: user.email,
            password: String(passwordEncode),
            telephone,
            created_at: new Date(),
            modified_at: new Date()
      
        },
        
       })

       if(!userCreated){
          throw new Error("Not was possible create user");
       }

       const output: UserDateOutput={
           id: userCreated.id,
           created_at: new Date(),
           modified_at: new Date()
       }

       return output;

    }

}

