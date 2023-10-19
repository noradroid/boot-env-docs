"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_type_1 = require("./file-type");
const properties_parser_1 = __importDefault(require("./properties-parser"));
const yaml_parser_1 = __importDefault(require("./yaml-parser"));
const main = (file, fileName) => {
    const fileType = fileName.endsWith(file_type_1.FileType.YAML) || fileName.endsWith(file_type_1.FileType.YML)
        ? file_type_1.FileType.YAML
        : file_type_1.FileType.PROPERTIES;
    if (fileType === file_type_1.FileType.YAML) {
        return (0, yaml_parser_1.default)(file);
    }
    else {
        return (0, properties_parser_1.default)(file);
    }
};
exports.default = main;
