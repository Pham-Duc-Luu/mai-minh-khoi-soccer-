import { Router } from "express";
import { getAllPlayer } from "../controller/player/getAllPlayers";
import { getPlayerByName } from "../controller/player/getPlayerByName";
import { get_player_info } from "../controller/player/get_player_info";

const route = Router();

route.get("/allPlayer", getAllPlayer);
route.post("/getPlayerByName", getPlayerByName);
route.post("/get_player_info", get_player_info);

export default route;
