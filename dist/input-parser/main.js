"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_type_1 = require("./shared/types/file.type");
const file_type_utils_1 = require("./shared/utils/file-type.utils");
const yaml_validator_1 = require("./yaml/yaml-validator");
const file_util_1 = __importDefault(require("../utils/file/file-util"));
const properties_validator_1 = require("./properties/properties-validator");
const properties_parser_1 = require("./properties/properties-parser");
const yaml_parser_1 = require("./yaml/yaml-parser");
const main = (fileName) => {
    const fileType = (0, file_type_utils_1.getFileType)(fileName);
    const contents = (0, file_util_1.default)(fileName);
    if (fileType === file_type_1.FileType.YAML) {
        const valid = (0, yaml_validator_1.validateDotYaml)(contents);
        if (!valid) {
            console.error("Invalid yaml file. Program terminating...");
            process.exit(1);
        }
        const keyValuePairs = (0, yaml_parser_1.parseDotYaml)(contents);
        return keyValuePairs;
    }
    else {
        const valid = (0, properties_validator_1.validateDotProperties)(contents);
        if (!valid) {
            console.error("Invalid properties file. Program terminating...");
            process.exit(1);
        }
        const keyValuePairs = (0, properties_parser_1.parseDotProperties)(contents);
        return keyValuePairs;
    }
};
exports.default = main;
