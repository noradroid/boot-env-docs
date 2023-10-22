"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDotYaml = void 0;
const yaml_1 = require("yaml");
const yaml_utils_1 = require("./utils/yaml-utils");
const parseYaml = (content) => {
    const documents = (0, yaml_1.parseAllDocuments)(content);
    const keyValuePairs = documents.flatMap(yaml_utils_1.convertDocumentIntoKeyValuePairs);
    return keyValuePairs;
};
const parseDotYaml = (content) => {
    return parseYaml(content);
};
exports.parseDotYaml = parseDotYaml;
