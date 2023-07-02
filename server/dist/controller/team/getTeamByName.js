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
exports.getTeamByName = void 0;
const client_1 = require("@prisma/client");
const pgClient_1 = __importDefault(require("../../config/pgClient"));
const prisma = new client_1.PrismaClient();
const getTeamByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(200).json({ errCode: 1, message: 'Missing parameter!' });
        }
        const teams = yield pgClient_1.default.query(`select * from team where name LIKE '%${name}%'`);
        const data = yield Promise.all(teams.rows.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const eachTeam = yield prisma.team.findUnique({
                where: {
                    teamid: item.teamid
                },
                include: {
                    huanluyen: true,
                    vodich: true,
                    thamgia: true
                }
            });
            return eachTeam;
        })));
        // const teams = await prisma.team.findMany({
        //     include : {
        //         huanluyen: true,
        //         vodich: true
        //     }
        // })
        return res.status(200).json({ errCode: 0, data: data });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ errCode: -1, message: "Error forom server!" });
    }
});
exports.getTeamByName = getTeamByName;
