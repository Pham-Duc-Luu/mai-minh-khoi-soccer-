import { PrismaClient, coach, player } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient();

export const get_player_info = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const allPlayer = await prisma.player.findUnique({
      where: {
        playerid: id as string,
      },
      include: {
        thidau: {
          include: {
            team: {
              include: {
                match_match_teamid1Toteam: true,
                match_match_teamid2Toteam: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({ data: allPlayer });
  } catch (error) {
    res.status(404).json({ errCode: -1, message: "Error from server!" });
  }
};
