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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamInfo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTeamInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const data = yield prisma.team.findUnique({
            where: {
                teamid: id,
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
    }
    catch (error) {
        console.log(error);
        return res
            .status(404)
            .json({ errCode: -1, message: "Error forom server!" });
    }
});
exports.getTeamInfo = getTeamInfo;
