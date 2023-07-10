"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerByName = void 0;
const client_1 = require("@prisma/client");
const pgClient_1 = __importDefault(require("../../config/pgClient"));
const prisma = new client_1.PrismaClient();
const getPlayerByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name } = req.body;
        if (!name) {
            return res
                .status(200)
                .json({ errCode: 1, message: "Missing parameter!" });
        }
        const players = yield pgClient_1.default.query(`select * from player where name LIKE '%${name}%'`);
        const data = yield Promise.all(players.rows.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            let player = yield prisma.player.findUnique({
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
        })));
        return res.status(200).json({
            errCode: 0,
            data: data,
        });
    }
    catch (error) {
        res.status(404).json({ errCode: -1, message: "Error from server!" });
    }
});
exports.getPlayerByName = getPlayerByName;
