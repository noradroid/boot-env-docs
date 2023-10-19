"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const main = (fileName) => {
    if (!fs_1.default.existsSync(fileName)) {
        console.error(`${fileName} does not exist`);
        process.exit(1);
    }
    console.log(`${fileName} exists`);
    const file = fs_1.default.readFileSync(fileName, "utf8");
    return file;
};
exports.default = main;
