"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    static toCategoryModel(category) {
        return new Category(category === null || category === void 0 ? void 0 : category.ID, category === null || category === void 0 ? void 0 : category.NAME);
    }
}
exports.Category = Category;
