"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const categoryRouter_1 = require("./router/categoryRouter");
const deviceRouter_1 = require("./router/deviceRouter");
app_1.default.use("/category", categoryRouter_1.categoryRouter);
app_1.default.use("/device", deviceRouter_1.deviceRouter);
