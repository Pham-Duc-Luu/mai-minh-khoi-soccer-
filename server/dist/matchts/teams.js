"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllTeam_1 = require("../controller/team/getAllTeam");
const getTeamByName_1 = require("../controller/team/getTeamByName");
const route = (0, express_1.Router)();
route.get('/getAllTeam', getAllTeam_1.getAllTeam);
route.post('/getTeamByName', getTeamByName_1.getTeamByName);
exports.default = route;
