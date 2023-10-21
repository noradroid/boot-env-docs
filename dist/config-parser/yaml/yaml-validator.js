"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDotYaml = void 0;
const yaml_1 = require("yaml");
const yaml_utils_1 = require("./utils/yaml-utils");
const validateYaml = (content) => {
    const result = (0, yaml_1.parseAllDocuments)(content);
    return result.every(yaml_utils_1.isDocumentValid);
};
/**
 * Return true if content is valid yaml.
 * @param content - Yaml file content
 */
const validateDotYaml = (content) => {
    return validateYaml(content);
};
exports.validateDotYaml = validateDotYaml;
