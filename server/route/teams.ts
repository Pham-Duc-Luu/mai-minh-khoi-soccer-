import { Router } from "express";
import { getAllTeam } from "../controller/team/getAllTeam";
import { getTeamByName } from "../controller/team/getTeamByName";
import { getTeamInfo } from "../controller/team/getTeamInfo";

const route = Router();

route.get("/getAllTeam", getAllTeam);
route.post("/getTeamByName", getTeamByName);
route.post("/getTeamInfo", getTeamInfo);

export default route;
