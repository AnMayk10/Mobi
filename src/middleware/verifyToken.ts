import { Request, Response, NextFunction } from "express";
import {  verify } from "jsonwebtoken";
import { auth } from "../config/config";



export const middleware ={ 
    async verifyToken(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization

    if(token === undefined){
        throw new Error("token not exists or invalid")
    }

    try {
        const decoded = verify(token,auth.secret)
        
          
        return next();

    } catch (error ) {
        return next(res.status(401).json({
            error: `error: ${error}`
        }))
    }
}}