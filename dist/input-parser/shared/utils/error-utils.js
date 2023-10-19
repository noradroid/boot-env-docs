"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatParseError = void 0;
/**
 * Format PropertiesParseError or YAMLParseError to display name and code.
 * @param err PropertiesParseError or YAMLParseError
 */
const formatParseError = (err) => {
    return `${err.name} - caused by ${err.code}`;
};
exports.formatParseError = formatParseError;
