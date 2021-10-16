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
exports.CategoryDeviceDatabase = void 0;
const baseDatabase_1 = require("./baseDatabase");
class CategoryDeviceDatabase extends baseDatabase_1.BaseDatabase {
    createCorrelation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    CD_DEVICE: data.CdDevice,
                    CD_CATEGORY: data.CdCategory,
                })
                    .into(CategoryDeviceDatabase.TABLE_NAME);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
    deleteDeviceCorrelation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const CD_DEVICE = data.CdDevice;
            let result;
            try {
                result = yield this.getConnection()
                    .delete("*")
                    .from(CategoryDeviceDatabase.TABLE_NAME)
                    .where({ CD_DEVICE });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
    deleteCategoryCorrelation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const CD_CATEGORY = data.CdCategory;
            let result;
            try {
                result = yield this.getConnection()
                    .delete("*")
                    .from(CategoryDeviceDatabase.TABLE_NAME)
                    .where({ CD_CATEGORY });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
    searchListByPartNumber(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.getConnection().raw(`select * from devices
          join category_devices
          on DEVICE_ID = category_devices.CD_DEVICE
          join category
          on category_devices.CD_CATEGORY = category.ID
          where PART_NUMBER = ${data.PART_NUMBER}`);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
            finally {
                return result[0];
            }
        });
    }
}
exports.CategoryDeviceDatabase = CategoryDeviceDatabase;
CategoryDeviceDatabase.TABLE_NAME = "category_devices";
