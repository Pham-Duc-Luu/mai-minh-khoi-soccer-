import { PrismaClient, coach, team } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient()


export const getTeamByName  = async (req : Request, res :Response) => {
    try {
        
        const {name } = req.body

        if(!name) {
            return res.status(200).json({errCode : 1, message : 'Missing parameter!'})
        }

        const teams = await pool.query(`select * from team where name LIKE '%${name}%'`)

        const data = await Promise.all( teams.rows.map(async (item : team) => {
            const eachTeam = await prisma.team.findUnique({
                where : {
                    teamid : item.teamid
                },
                include : {
                    huanluyen : true,
                    vodich: true,
                    thamgia : true
                }
            })

            return eachTeam
        }))

        // const teams = await prisma.team.findMany({
        //     include : {
        //         huanluyen: true,
        //         vodich: true
        //     }
        // })

        

        return res.status(200).json({errCode:0, data: data})

    } catch (error) {
        console.log(error);
        
       return  res.status(404).json({errCode : -1, message: "Error forom server!"})
    }
}