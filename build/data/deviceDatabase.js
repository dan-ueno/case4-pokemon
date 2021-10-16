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
exports.DeviceDatabase = void 0;
const deviceModel_1 = require("../model/deviceModel");
const baseDatabase_1 = require("./baseDatabase");
class DeviceDatabase extends baseDatabase_1.BaseDatabase {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({ PART_NUMBER: data.PART_NUMBER, COLOR: data.COLOR })
                    .into(DeviceDatabase.TABLE_NAME);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.getConnection()
                    .select("*")
                    .from(DeviceDatabase.TABLE_NAME);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
            finally {
                if (result instanceof Array) {
                    return result.map((device) => {
                        return deviceModel_1.Device.toDeviceModel(device);
                    });
                }
                return [];
            }
        });
    }
    searchByPartNumber(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const PART_NUMBER = data.PART_NUMBER;
            let result;
            try {
                result = yield this.getConnection()
                    .select("*")
                    .from(DeviceDatabase.TABLE_NAME)
                    .where({ PART_NUMBER });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
            finally {
                return deviceModel_1.Device.toDeviceModel(result[0]);
            }
        });
    }
    deleteByPartNumber(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const PART_NUMBER = data.PART_NUMBER;
            let result;
            try {
                result = yield this.getConnection()
                    .delete("*")
                    .from(DeviceDatabase.TABLE_NAME)
                    .where(PART_NUMBER);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message.includes("FOREIGN KEY")) {
                        throw new Error("First delete Devices that uses that Category, then delete the Category");
                    }
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.DeviceDatabase = DeviceDatabase;
DeviceDatabase.TABLE_NAME = "devices";
