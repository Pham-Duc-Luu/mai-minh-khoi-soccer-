import { Router } from "express";
import { getAllTeam } from "../controller/team/getAllTeam";
import { getTeamByName } from "../controller/team/getTeamByName";

const route = Router()

route.get('/getAllTeam' , getAllTeam)
route.post('/getTeamByName' , getTeamByName)

export default route 
