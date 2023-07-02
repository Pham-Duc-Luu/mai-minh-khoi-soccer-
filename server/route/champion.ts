import { Router } from "express";
import { getAllChampion } from "../controller/champion/getAllChampion";

const route = Router()

route.get('/getAllChampion' , getAllChampion)

export default route 
