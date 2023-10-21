"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDotProperties = void 0;
const properties_utils_1 = require("./utils/properties-utils");
const validateProperties = (content) => {
    const lines = (0, properties_utils_1.splitPropertiesIntoLines)(content);
    lines.forEach(properties_utils_1.isLineValid);
};
/**
 * Return true if content is valid properties.
 * @param content - Properties file content
 */
const validateDotProperties = (content) => {
    validateProperties(content);
};
exports.validateDotProperties = validateDotProperties;
