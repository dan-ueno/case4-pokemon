"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
class Device {
    constructor(DEVICE_ID, COLOR, PART_NUMBER) {
        this.DEVICE_ID = DEVICE_ID;
        this.COLOR = COLOR;
        this.PART_NUMBER = PART_NUMBER;
    }
    getId() {
        return this.DEVICE_ID;
    }
    getColor() {
        return this.COLOR;
    }
    getPart_Number() {
        return this.PART_NUMBER;
    }
    static toDeviceModel(category) {
        return new Device(category === null || category === void 0 ? void 0 : category.DEVICE_ID, category === null || category === void 0 ? void 0 : category.COLOR, category === null || category === void 0 ? void 0 : category.PART_NUMBER);
    }
}
exports.Device = Device;
