import { PrismaClient, coach, player } from "@prisma/client";
import { Request, Response } from "express";
import pool from "../../config/pgClient";

const prisma = new PrismaClient();

export const getPlayerByName = async (req: Request, res: Response) => {
  try {
    let { name } = req.body;

    if (!name) {
      return res
        .status(200)
        .json({ errCode: 1, message: "Missing parameter!" });
    }

    const players = await pool.query(
      `select * from player where name LIKE '%${name}%'`
    );

    const data = await Promise.all(
      players.rows.map(async (item: player) => {
        let player = await prisma.player.findUnique({
          where: {
            playerid: item.playerid,
          },
          include: {
            thidau: {
              include: {
                team: true,
              },
            },
          },
        });

        return player;
      })
    );

    return res.status(200).json({
      errCode: 0,
      data: data,
    });
  } catch (error) {
    res.status(404).json({ errCode: -1, message: "Error from server!" });
  }
};
