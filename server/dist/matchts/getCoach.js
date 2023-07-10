"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getCoachByName_1 = require("../controller/coach/getCoachByName");
const getAllCoach_1 = require("../controller/coach/getAllCoach");
const coach = (0, express_1.Router)();
coach.post('/getCoachByName', getCoachByName_1.getCoachByName);
coach.get('/getAllCoach', getAllCoach_1.getAllCoach);
exports.default = coach;
