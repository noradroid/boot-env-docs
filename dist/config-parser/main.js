"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIntoKeyValuePairs = void 0;
const yaml_1 = require("yaml");
const error_utils_1 = require("../utils/errors/error-utils");
const properties_parse_error_1 = require("./properties/errors/properties-parse.error");
const properties_parser_1 = require("./properties/properties-parser");
const properties_validator_1 = require("./properties/properties-validator");
const file_type_1 = require("./shared/types/file.type");
const yaml_parser_1 = require("./yaml/yaml-parser");
const yaml_validator_1 = require("./yaml/yaml-validator");
const parseIntoKeyValuePairs = (fileContent, fileType) => {
    try {
        if (fileType === file_type_1.FileType.YAML) {
            (0, yaml_validator_1.validateDotYaml)(fileContent);
            const keyValuePairs = (0, yaml_parser_1.parseDotYaml)(fileContent);
            return keyValuePairs;
        }
        else {
            (0, properties_validator_1.validateDotProperties)(fileContent);
            const keyValuePairs = (0, properties_parser_1.parseDotProperties)(fileContent);
            return keyValuePairs;
        }
    }
    catch (err) {
        if (err instanceof yaml_1.YAMLParseError) {
            console.error((0, error_utils_1.formatParseError)(err) + ` - ${err.message}`);
            // YAMLParseError - caused by BLOCK_AS_IMPLICIT_KEY
            // Nested mappings are not allowed in compact mappings
        }
        else if (err instanceof properties_parse_error_1.PropertiesParseError) {
            console.error((0, error_utils_1.formatParseError)(err) + ` - ${err.message}`);
            // PropertiesParseError - caused by MISSING_VALUE_ASSIGN
            // Property is not assigned a value
        }
        else {
            console.error(err);
        }
        process.exit(1);
    }
};
exports.parseIntoKeyValuePairs = parseIntoKeyValuePairs;
