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
exports.DeviceController = void 0;
const baseDatabase_1 = require("../data/baseDatabase");
const BaseError_1 = require("../error/BaseError");
class DeviceController {
    constructor(deviceBusiness) {
        this.deviceBusiness = deviceBusiness;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createData = {
                    COLOR: req.body.color,
                    PART_NUMBER: req.body.partNumber,
                };
                yield this.deviceBusiness.create(createData);
                res.status(201).end();
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.code).send({ message: error.message });
                }
                else if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
            }
            finally {
                yield baseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getData = yield this.deviceBusiness.getAll();
                res.status(200).send(getData);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.code).send({ message: error.message });
                }
                else if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
            }
            finally {
                yield baseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteData = {
                    PART_NUMBER: req.params.partNumber,
                };
                yield this.deviceBusiness.delete(deleteData);
                res.status(200).end();
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.code).send({ message: error.message });
                }
                else if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
            }
            finally {
                yield baseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
}
exports.DeviceController = DeviceController;
