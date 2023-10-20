"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileType = exports.isMdFile = exports.isJsonFile = exports.isPropertiesFile = exports.isYamlFile = exports.writeFile = exports.readFile = exports.isFileExist = void 0;
const fs_1 = __importDefault(require("fs"));
const file_extensions_1 = require("./constants/file-extensions");
const file_type_1 = require("./types/file.type");
const isFileExist = (fileName) => {
    return fs_1.default.existsSync(fileName);
};
exports.isFileExist = isFileExist;
const validateFileExists = (fileName) => {
    if (!(0, exports.isFileExist)(fileName)) {
        throw new Error(`${fileName} does not exist`);
    }
};
const readFile = (fileName) => {
    validateFileExists(fileName);
    console.log(`${fileName} exists`);
    const file = fs_1.default.readFileSync(fileName, "utf8");
    return file;
};
exports.readFile = readFile;
const writeFile = (fileName, contents) => {
    try {
        fs_1.default.writeFileSync(fileName, contents);
    }
    catch (err) {
        throw err;
    }
};
exports.writeFile = writeFile;
const isYamlFile = (fileName) => {
    const name = fileName.toLowerCase();
    return name.endsWith(file_extensions_1.YAML_EXT) || name.endsWith(file_extensions_1.YML_EXT);
};
exports.isYamlFile = isYamlFile;
const isPropertiesFile = (fileName) => {
    const name = fileName.toLowerCase();
    return name.endsWith(file_extensions_1.PROPERTIES_EXT);
};
exports.isPropertiesFile = isPropertiesFile;
const isJsonFile = (fileName) => {
    const name = fileName.toLowerCase();
    return name.endsWith(file_extensions_1.JSON_EXT);
};
exports.isJsonFile = isJsonFile;
const isMdFile = (fileName) => {
    const name = fileName.toLowerCase();
    return name.endsWith(file_extensions_1.MD_EXT);
};
exports.isMdFile = isMdFile;
const getFileType = (fileName) => {
    if ((0, exports.isYamlFile)(fileName)) {
        return file_type_1.FileType.YAML;
    }
    else if ((0, exports.isPropertiesFile)(fileName)) {
        return file_type_1.FileType.PROPERTIES;
    }
    else if ((0, exports.isJsonFile)(fileName)) {
        return file_type_1.FileType.JSON;
    }
    else if ((0, exports.isMdFile)(fileName)) {
        return file_type_1.FileType.MD;
    }
    else {
        throw new Error("Invalid file type!");
    }
};
exports.getFileType = getFileType;
