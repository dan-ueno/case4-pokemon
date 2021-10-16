"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_deviceBusiness_1 = require("../business/category-deviceBusiness");
const deviceBusiness_1 = require("../business/deviceBusiness");
const category_deviceController_1 = require("../controller/category-deviceController");
const deviceController_1 = require("../controller/deviceController");
const category_deviceDatabase_1 = require("../data/category-deviceDatabase");
const categoryDatabase_1 = require("../data/categoryDatabase");
const deviceDatabase_1 = require("../data/deviceDatabase");
exports.deviceRouter = express_1.default.Router();
const deviceDatabase = new deviceDatabase_1.DeviceDatabase();
const deviceBusiness = new deviceBusiness_1.DeviceBusiness(deviceDatabase);
const deviceController = new deviceController_1.DeviceController(deviceBusiness);
const categoryDatabase = new categoryDatabase_1.CategoryDatabase();
const categoryDeviceDatabase = new category_deviceDatabase_1.CategoryDeviceDatabase();
const categoryDeviceBusiness = new category_deviceBusiness_1.CategoryDeviceBusiness(categoryDeviceDatabase, deviceDatabase, categoryDatabase);
const categoryDeviceController = new category_deviceController_1.CategoryDeviceController(categoryDeviceBusiness);
exports.deviceRouter.get("/get-all", (req, res) => deviceController.getAll(req, res));
exports.deviceRouter.get("/category-list/:partNumber", (req, res) => categoryDeviceController.getCategoryListByDevice(req, res));
exports.deviceRouter.post("/create", (req, res) => deviceController.create(req, res));
exports.deviceRouter.delete("/delete/:partNumber", (req, res) => deviceController.delete(req, res));
exports.deviceRouter.delete("/remove-from-category/:name", (req, res) => categoryDeviceController.deleteDeviceFromCategory(req, res));