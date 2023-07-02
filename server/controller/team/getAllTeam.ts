import { PrismaClient, coach } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient()


export const getAllTeam  = async (req : Request, res :Response) => {
    try {
        
        const teams = await prisma.team.findMany({
            include : {
                huanluyen: true,
                vodich: true,
                thamgia : true

            }
        })

        

        return res.status(200).json({errCode:0, data: teams})

    } catch (error) {
        console.log(error);
        
       return  res.status(404).json({errCode : -1, message: "Error forom server!"})
    }
}