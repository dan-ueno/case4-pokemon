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
exports.CategoryBusiness = void 0;
class CategoryBusiness {
    constructor(categoryDatabase) {
        this.categoryDatabase = categoryDatabase;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.name) {
                throw new Error("Name must be provided to create a new category");
            }
            const verifiedCategory = yield this.categoryDatabase.searchByName(data);
            if (verifiedCategory.getId()) {
                throw new Error("Name already exists");
            }
            yield this.categoryDatabase.create(data);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryDatabase.getAll();
        });
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.name) {
                throw new Error("Name must be provided to delete a category");
            }
            yield this.categoryDatabase.deleteByName(data);
        });
    }
}
exports.CategoryBusiness = CategoryBusiness;
