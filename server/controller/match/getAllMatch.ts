import { PrismaClient, coach } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient();

export const getAllMatch = async (req: Request, res: Response) => {
  try {
    const champions = await prisma.match.findMany({
      include: {
        league: true,
        stadium: true,
        team_match_teamid1Toteam: true,
        team_match_teamid2Toteam: true,
      },
    });

    return res.status(200).json({ errCode: 0, data: champions });
  } catch (error) {
    return res
      .status(404)
      .json({ errCode: -1, message: "Error forom server!" });
  }
};
