"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllChampion_1 = require("../controller/champion/getAllChampion");
const route = (0, express_1.Router)();
route.get('/getAllChampion', getAllChampion_1.getAllChampion);
exports.default = route;
