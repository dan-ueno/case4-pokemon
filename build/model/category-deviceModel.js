"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDevice = void 0;
class CategoryDevice {
    constructor(CD_DEVICE, CD_CATEGORY) {
        this.CD_DEVICE = CD_DEVICE;
        this.CD_CATEGORY = CD_CATEGORY;
    }
    getCdDevice() {
        return this.CD_DEVICE;
    }
    getCDCategory() {
        return this.CD_CATEGORY;
    }
    static toCategoryDeviceModel(deviceModel) {
        return new CategoryDevice(deviceModel.CD_DEVICE, deviceModel.CD_CATEGORY);
    }
}
exports.CategoryDevice = CategoryDevice;
