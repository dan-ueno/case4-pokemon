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
exports.DeviceBusiness = void 0;
const BaseError_1 = require("../error/BaseError");
class DeviceBusiness {
    constructor(deviceDatabase) {
        this.deviceDatabase = deviceDatabase;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.COLOR || !data.PART_NUMBER) {
                throw new Error("Color and PartName must be provided to create a new device");
            }
            const verifiedDevice = yield this.deviceDatabase.searchByPartNumber(data);
            if (verifiedDevice.getId()) {
                throw new BaseError_1.BaseError("Device with this PartNumber already exists", 400);
            }
            yield this.deviceDatabase.create(data);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.deviceDatabase.getAll();
        });
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.PART_NUMBER) {
                throw new Error("PartNumber must be provided to delete a category");
            }
            const verifyDevice = yield this.deviceDatabase.searchByPartNumber(data);
            if (!verifyDevice.getId()) {
                throw new BaseError_1.BaseError("Device with this PartNumber doesn't exists", 400);
            }
            yield this.deviceDatabase.deleteByPartNumber(data);
        });
    }
}
exports.DeviceBusiness = DeviceBusiness;
