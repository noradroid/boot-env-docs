"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDotProperties = void 0;
const properties_utils_1 = require("./utils/properties-utils");
const parseProperties = (content) => {
    const lines = (0, properties_utils_1.splitPropertiesIntoLines)(content);
    const keyValuePairs = lines.map(properties_utils_1.splitLineIntoKeyValue);
    return keyValuePairs;
};
const parseDotProperties = (content) => {
    return parseProperties(content);
};
exports.parseDotProperties = parseDotProperties;
