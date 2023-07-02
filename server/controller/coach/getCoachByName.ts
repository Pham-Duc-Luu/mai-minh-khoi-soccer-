import { PrismaClient, coach } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient()


export const getCoachByName  = async (req : Request, res :Response) => {
    try {
        
        let { name } = req.body

        if(!name) {
          return  res.status(200).json({errCode:1, message:'Missing parameter!'})
        }


        const coach = await pool.query(`select * from coach where name LIKE '%${name}%'`)

        const data =await Promise.all( 

            coach.rows.map(async (item : coach) => {
            
            let coach =  await prisma.coach.findUnique({
                where: {
                    coachid: item.coachid
                }
            })
        
            return coach
        })
        ) 
        
        

        return res.status(200).json({errCode:0, data: data})

    } catch (error) {
       return  res.status(404).json({error: error.message})
    }
}