"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateYaml = void 0;
const yaml_1 = require("yaml");
const parseSingleDocument = (content) => {
    try {
        (0, yaml_1.parse)(content);
        return true;
    }
    catch (err) {
        // YAMLParseError
        console.error(err);
        return false;
    }
};
const parseMultiDocument = (content) => {
    try {
        (0, yaml_1.parseAllDocuments)(content);
        return true;
    }
    catch (err) {
        // YAMLParseError
        console.error(err);
        return false;
    }
};
/**
 * Return true if content is valid yaml.
 * @param content - Yaml file content
 */
const validateYaml = (content) => {
    return parseSingleDocument(content) || parseMultiDocument(content);
};
exports.validateYaml = validateYaml;
