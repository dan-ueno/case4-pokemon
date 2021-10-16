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
exports.Migrations = void 0;
const baseDatabase_1 = require("./baseDatabase");
class Migrations extends baseDatabase_1.BaseDatabase {
    createTableCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`CREATE TABLE category (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      NAME VARCHAR(128) UNIQUE NOT NULL
      );`);
        });
    }
    createTableDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`CREATE TABLE devices (
DEVICE_ID INT AUTO_INCREMENT PRIMARY KEY,
COLOR VARCHAR(16) NOT NULL,
PART_NUMBER INT NOT NULL
);`);
        });
    }
    createTableCategoryDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`CREATE TABLE category_devices(
CD_ID     INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
CD_DEVICE INT NOT NULL,
CD_CATEGORY INT NOT NULL,
FOREIGN KEY (CD_DEVICE) REFERENCES devices (DEVICE_ID),
FOREIGN KEY (CD_CATEGORY) REFERENCES category (ID)
);`);
        });
    }
    createView() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`CREATE VIEW category_device_summary AS
  SELECT
    DEVICE_ID                                                                                              AS DEVICE_ID,
    max(PART_NUMBER)                                                                                       AS device_PART_NUMBER,
    max(COLOR)                                                                                       AS DEVICE_COLOR,
    cast(concat('[', group_concat(json_quote(NAME) ORDER BY NAME SEPARATOR ','), ']') as json) AS category_array
  FROM
    devices
    INNER JOIN category_devices
      ON devices.DEVICE_ID = category_devices.CD_DEVICE
    INNER JOIN category
      ON category_devices.CD_CATEGORY = category.id
  GROUP BY
    DEVICE_ID ;`);
        });
    }
    viewTables() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`select * from category_device_summary`);
        });
    }
}
exports.Migrations = Migrations;
const migrations = new Migrations();
migrations.createTableCategory();
migrations.createTableDevices();
migrations.createTableCategoryDevices();
