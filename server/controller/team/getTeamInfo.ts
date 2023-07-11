import { PrismaClient, coach, team } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient();

export const getTeamInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const data = await prisma.team.findUnique({
      where: {
        teamid: id as string,
      },
      include: {
        huanluyen: {
          include: {
            coach: true,
          },
        },
        thamgia: true,
        stadium: true,
        vodich: {
          include: {
            league: true,
          },
        },
        thidau: {
          include: {
            player: true,
          },
          orderBy: {
            year: "desc",
          },
        },
      },
    });
    // const teams = await prisma.team.findMany({
    //     include : {
    //         huanluyen: true,
    //         vodich: true
    //     }
    // })

    return res.status(200).json({ errCode: 0, data: data });
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ errCode: -1, message: "Error forom server!" });
  }
};
