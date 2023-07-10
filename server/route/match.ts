import { Router } from "express";
import { getAllTeam } from "../controller/team/getAllTeam";
import { getTeamByName } from "../controller/team/getTeamByName";
import { getAllMatch } from "../controller/match/getAllMatch";

const route = Router();

route.get("/getAllMatch", getAllMatch);

export default route;
