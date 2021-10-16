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
exports.CategoryDatabase = void 0;
const categoryModel_1 = require("../model/categoryModel");
const baseDatabase_1 = require("./baseDatabase");
class CategoryDatabase extends baseDatabase_1.BaseDatabase {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    NAME: data.name,
                })
                    .into(CategoryDatabase.TABLE_NAME);
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
                    .from(CategoryDatabase.TABLE_NAME);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
            finally {
                if (result instanceof Array) {
                    return result.map((category) => {
                        return categoryModel_1.Category.toCategoryModel(category);
                    });
                }
                return [];
            }
        });
    }
    searchByName(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const NAME = data.name;
            let result;
            try {
                result = yield this.getConnection()
                    .select("*")
                    .from(CategoryDatabase.TABLE_NAME)
                    .where({ NAME });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
            finally {
                return categoryModel_1.Category.toCategoryModel(result[0]);
            }
        });
    }
    deleteByName(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const NAME = data.name;
            let result;
            try {
                result = yield this.getConnection()
                    .delete("*")
                    .from(CategoryDatabase.TABLE_NAME)
                    .where({ NAME });
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
exports.CategoryDatabase = CategoryDatabase;
CategoryDatabase.TABLE_NAME = "category";
