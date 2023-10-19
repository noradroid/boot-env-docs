"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDotYaml = void 0;
const yaml_1 = require("yaml");
const error_utils_1 = require("../shared/utils/error-utils");
const yaml_utils_1 = require("./utils/yaml-utils");
const parseYaml = (content) => {
    try {
        const result = (0, yaml_1.parseAllDocuments)(content);
        return result.every(yaml_utils_1.isDocumentValid);
    }
    catch (err) {
        // YAMLParseError
        if (err instanceof yaml_1.YAMLParseError) {
            console.error((0, error_utils_1.formatParseError)(err));
            // YAMLParseError - caused by BLOCK_AS_IMPLICIT_KEY
            // = Nested mappings are not allowed in compact mappings
        }
        else {
            console.error(err);
        }
        return false;
    }
};
/**
 * Return true if content is valid yaml.
 * @param content - Yaml file content
 */
const validateDotYaml = (content) => {
    return parseYaml(content);
};
exports.validateDotYaml = validateDotYaml;
