import { PrismaClient, coach } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient()


export const getAllCoach  = async (req : Request, res :Response) => {
    try {
        
        const coach = await prisma.coach.findMany({
            include : {
                huanluyen : {
                    include : {
                        team : true
                    }
                }
            }
        })


        return res.status(200).json({errCode:0, data: coach})

    } catch (error) {
       return  res.status(404).json({errCode : -1, message: "Error forom server!"})
    }
}