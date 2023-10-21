"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = require("yaml");
const error_utils_1 = require("../utils/error/error-utils");
const file_utils_1 = require("../utils/file/file-utils");
const properties_parse_error_1 = require("./properties/errors/properties-parse.error");
const properties_parser_1 = require("./properties/properties-parser");
const properties_validator_1 = require("./properties/properties-validator");
const file_type_1 = require("./shared/types/file.type");
const file_type_utils_1 = require("./shared/utils/file-type.utils");
const yaml_parser_1 = require("./yaml/yaml-parser");
const yaml_validator_1 = require("./yaml/yaml-validator");
const main = (fileName) => {
    const fileType = (0, file_type_utils_1.getFileType)(fileName);
    const contents = (0, file_utils_1.readFile)(fileName);
    if (fileType === file_type_1.FileType.YAML) {
        try {
            (0, yaml_validator_1.validateDotYaml)(contents);
        }
        catch (err) {
            if (err instanceof yaml_1.YAMLParseError) {
                console.error((0, error_utils_1.formatParseError)(err) + ` - ${err.message}`);
                // YAMLParseError - caused by BLOCK_AS_IMPLICIT_KEY
                // Nested mappings are not allowed in compact mappings
            }
            else {
                console.error(err);
            }
            console.error("Invalid yaml file. Program terminating...");
            process.exit(1);
        }
        const keyValuePairs = (0, yaml_parser_1.parseDotYaml)(contents);
        return keyValuePairs;
    }
    else {
        try {
            (0, properties_validator_1.validateDotProperties)(contents);
        }
        catch (err) {
            if (err instanceof properties_parse_error_1.PropertiesParseError) {
                console.error((0, error_utils_1.formatParseError)(err) + ` - ${err.message}`);
                // PropertiesParseError - caused by MISSING_VALUE_ASSIGN
                // Property is not assigned a value
            }
            else {
                console.error(err);
            }
            console.error("Invalid properties file. Program terminating...");
            process.exit(1);
        }
        const keyValuePairs = (0, properties_parser_1.parseDotProperties)(contents);
        return keyValuePairs;
    }
};
exports.default = main;
