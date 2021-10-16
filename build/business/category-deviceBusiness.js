"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDeviceBusiness = void 0;
const BaseError_1 = require("../error/BaseError");
class CategoryDeviceBusiness {
    constructor(categoryDeviceDatabase, deviceDatabase, categoryDatabase) {
        this.categoryDeviceDatabase = categoryDeviceDatabase;
        this.deviceDatabase = deviceDatabase;
        this.categoryDatabase = categoryDatabase;
    }
    createCorrelation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.name || !data.PART_NUMBER) {
                throw new Error("Name and PartNumber must be provided to vinculate both entities");
            }
            if (isNaN(Number(data.PART_NUMBER)) || Number(data.PART_NUMBER) < 0) {
                throw new Error("Valid PartNumber must be provided to vinculate both entities");
            }
            const dataToDB = {
                name: data.name,
                PART_NUMBER: Number(data.PART_NUMBER),
            };
            const verifiedCategory = yield this.categoryDatabase.searchByName(dataToDB);
            if (!verifiedCategory.getId()) {
                throw new BaseError_1.BaseError("Category not found", 400);
            }
            const verifiedDevice = yield this.deviceDatabase.searchByPartNumber(dataToDB);
            if (!verifiedDevice.getId()) {
                throw new BaseError_1.BaseError("Device not found", 400);
            }
            const dataToDatabase = {
                CdDevice: verifiedDevice.getId(),
                CdCategory: verifiedCategory.getId(),
            };
            return this.categoryDeviceDatabase.createCorrelation(dataToDatabase);
        });
    }
    getCategoryListByDevice(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.PART_NUMBER) {
                throw new Error("PartNumber must be provided");
            }
            if (isNaN(Number(data.PART_NUMBER)) || Number(data.PART_NUMBER) < 0) {
                throw new Error("Valid PartNumber must be provided");
            }
            const dataToDB = {
                PART_NUMBER: Number(data.PART_NUMBER),
            };
            const verifiedDevice = yield this.deviceDatabase.searchByPartNumber(dataToDB);
            if (!verifiedDevice.getId()) {
                throw new BaseError_1.BaseError("Device not found", 400);
            }
            const dataFromDB = yield this.categoryDeviceDatabase.searchListByPartNumber(dataToDB);
            const categoryList = dataFromDB.map((result) => result.NAME);
            const returnData = {
                PartNumber: verifiedDevice.getPart_Number(),
                Color: verifiedDevice.getColor(),
                CategoryList: categoryList,
            };
            return returnData;
        });
    }
    deleteDeviceCorrelation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.PART_NUMBER) {
                throw new Error("PartNumber must be provided to be deleted");
            }
            if (isNaN(Number(data.PART_NUMBER)) || Number(data.PART_NUMBER) < 0) {
                throw new Error("Valid PartNumber must be provided to vinculate both entities");
            }
            const dataToDB = {
                PART_NUMBER: Number(data.PART_NUMBER),
            };
            const verifiedDevice = yield this.deviceDatabase.searchByPartNumber(dataToDB);
            if (!verifiedDevice.getId()) {
                throw new BaseError_1.BaseError("Device not found", 400);
            }
            yield this.categoryDeviceDatabase.deleteDeviceCorrelation({
                CdDevice: verifiedDevice.getId(),
            });
        });
    }
    deleteCategoryCorrelation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.name) {
                throw new Error("Name must be provided to be deleted");
            }
            const verifiedCategory = yield this.categoryDatabase.searchByName(data);
            if (!verifiedCategory.getId()) {
                throw new BaseError_1.BaseError("Category not found", 400);
            }
            yield this.categoryDeviceDatabase.deleteCategoryCorrelation({
                CdCategory: verifiedCategory.getId(),
            });
        });
    }
}
exports.CategoryDeviceBusiness = CategoryDeviceBusiness;
