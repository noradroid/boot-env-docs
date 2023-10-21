"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitLineIntoKeyValue = exports.splitPropertiesIntoLines = exports.isLineValid = void 0;
const tokens_1 = require("../constants/tokens");
const properties_parse_error_1 = require("../errors/properties-parse.error");
const trimLine = (line) => {
    return line.trim();
};
const isNotEmptyLine = (line) => {
    return line.length > 0;
};
const isNotComment = (line) => {
    return !line.startsWith(tokens_1.COMMENT_CHARACTER);
};
const isLineValid = (line) => {
    if (!line.includes(tokens_1.EQUAL_SEPARATOR)) {
        throw new properties_parse_error_1.PropertiesParseError(line);
    }
};
exports.isLineValid = isLineValid;
const splitPropertiesIntoLines = (content) => {
    return content
        .split(tokens_1.NEWLINE_SEPARATOR)
        .map(trimLine)
        .filter(isNotEmptyLine)
        .filter(isNotComment);
};
exports.splitPropertiesIntoLines = splitPropertiesIntoLines;
/**
 * Split line into key-value pair.
 * @param line - Line containing property key and value
 */
const splitLineIntoKeyValue = (line) => {
    const equalSeparatorIndex = line.indexOf(tokens_1.EQUAL_SEPARATOR);
    const key = line.substring(0, equalSeparatorIndex).trim();
    const value = line.substring(equalSeparatorIndex + 1).trim();
    return { key, value };
};
exports.splitLineIntoKeyValue = splitLineIntoKeyValue;
