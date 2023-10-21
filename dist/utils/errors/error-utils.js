"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatParseError = void 0;
/**
 * Format PropertiesParseError or YAMLParseError or EnvVarParseError to display name and code.
 * @param err PropertiesParseError or YAMLParseError or EnvVarParseError
 */
const formatParseError = (err) => {
    return `${err.name} - caused by ${err.code}`;
};
exports.formatParseError = formatParseError;
