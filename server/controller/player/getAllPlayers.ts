import { PrismaClient, coach, player } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient()


export const getAllPlayer = async (req : Request, res :Response) => {
    try {
        const allPlayer = await prisma.player.findMany({include : {
            thidau: {
                include: { 
                    team: true
                }
            }
        } })

        res.status(200).json({data: allPlayer})
    } catch (error) {
        res.status(404).json({errCode: -1, message :'Error from server!'})
        
    }
}

