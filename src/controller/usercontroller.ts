import { authUser } from "../service/authetication/authServices";
import { service } from "../service/userServices";
import { User } from "../service/validation/input";
import { UserDateOutput } from "../types/singin";
import type {Request, Response} from 'express'
import { DataUserOutput } from "../types/userOutput";
import { Users } from "@prisma/client";
import { UUID } from "crypto";


export const controller={
    async signUp(req:Request<{},{},{user : User}>, res: Response): Promise<Response<UserDateOutput>>{
        if(req === null || req === undefined){
            throw new Error("resquest invalid or undefined")
        }
       
        const {user} = req.body;

        const userCreated = await service.signUp(user)

        console.log(userCreated)

        if(typeof userCreated === "string" || userCreated === null){
            res.status(400).json({
                message: "Error"
            })
        }

        return res.status(200).send(userCreated)
    },

    async signIn(req:Request<{},{},{login:{email:string, password:string}}>, res:Response):Promise<Response<{token :string}>>{
         const {login} = req.body

         const token =  await service.singIn(login)

         if(!token){
            return res.status(401).json({
                token:"invalid: email or senha incorrect"
            })
         }

         return res.status(200).json({
             token
         })
    },

    async getUserSystem(req: Request<{id: string}>, res: Response):Promise<Response<DataUserOutput>>{
     
        const {id}= req.params

        const userFound = await service.getUser(id);

        if(userFound=== null){
            console.error("ERRRRORR")
            return res.status(401).json({
                user: "user not found"
            })
        }

        return res.status(201).json({
            user:userFound
        })
    }
}