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
exports.CategoryDeviceController = void 0;
const baseDatabase_1 = require("../data/baseDatabase");
const BaseError_1 = require("../error/BaseError");
class CategoryDeviceController {
    constructor(categoryDeviceBusiness) {
        this.categoryDeviceBusiness = categoryDeviceBusiness;
    }
    AddCategoryToDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name: req.body.name,
                    PART_NUMBER: req.body.partNumber,
                };
                yield this.categoryDeviceBusiness.createCorrelation(data);
                res.status(201).end();
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.code).send({ message: error.message });
                }
                else if (error instanceof Error) {
                    res.status(400).send({ message: error.message });
                }
            }
            finally {
                yield baseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
    getCategoryListByDevice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    PART_NUMBER: req.params.partNumber,
                };
                const getData = yield this.categoryDeviceBusiness.getCategoryListByDevice(data);
                res.status(200).send(getData);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.code).send({ message: error.message });
                }
                else if (error instanceof Error) {
                    res.status(400).send({ message: error.message });
                }
            }
            finally {
                yield baseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
    deleteCategoryFromDevices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteData = {
                    name: req.params.name,
                };
                yield this.categoryDeviceBusiness.deleteCategoryCorrelation(deleteData);
                res.status(200).end();
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.code).send({ message: error.message });
                }
                else if (error instanceof Error) {
                    res.status(400).send({ message: error.message });
                }
            }
            finally {
                yield baseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
    deleteDeviceFromCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteData = {
                    PART_NUMBER: req.params.partNumber,
                };
                yield this.categoryDeviceBusiness.deleteDeviceCorrelation(deleteData);
                res.status(200).end();
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.code).send({ message: error.message });
                }
                else if (error instanceof Error) {
                    res.status(400).send({ message: error.message });
                }
            }
            finally {
                yield baseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
}
exports.CategoryDeviceController = CategoryDeviceController;
