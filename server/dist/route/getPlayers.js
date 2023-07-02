"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllPlayers_1 = require("../controller/player/getAllPlayers");
const getPlayerByName_1 = require("../controller/player/getPlayerByName");
const route = (0, express_1.Router)();
route.get('/allPlayer', getAllPlayers_1.getAllPlayer);
route.post('/getPlayerByName', getPlayerByName_1.getPlayerByName);
exports.default = route;
