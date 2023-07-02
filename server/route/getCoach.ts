import { Router } from "express";
import {  getCoachByName } from "../controller/coach/getCoachByName";
import { getAllCoach } from "../controller/coach/getAllCoach";

const coach = Router()

coach.post('/getCoachByName' , getCoachByName)
coach.get('/getAllCoach', getAllCoach)

export default coach 