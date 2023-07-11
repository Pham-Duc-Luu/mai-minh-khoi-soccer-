import { Router } from "express";
import { getCoachByName } from "../controller/coach/getCoachByName";
import { getAllCoach } from "../controller/coach/getAllCoach";
import { getCoachInfo } from "../controller/coach/getCoachInfo";

const coach = Router();

coach.post("/getCoachByName", getCoachByName);
coach.get("/getAllCoach", getAllCoach);
coach.post("/getCoachInfo", getCoachInfo);

export default coach;
