"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllMatch_1 = require("../controller/match/getAllMatch");
const route = (0, express_1.Router)();
route.get("/getAllMatch", getAllMatch_1.getAllMatch);
exports.default = route;
