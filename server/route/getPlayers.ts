import { Router } from "express";
import { getAllPlayer } from "../controller/player/getAllPlayers";
import { getPlayerByName } from "../controller/player/getPlayerByName";

const route = Router()

route.get('/allPlayer' , getAllPlayer)
route.post('/getPlayerByName' , getPlayerByName)

export default route 