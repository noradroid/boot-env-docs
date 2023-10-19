"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitLineIntoKeyValue = exports.splitPropertiesIntoLines = exports.isLineValid = void 0;
const tokens_1 = require("../constants/tokens");
const properties_parse_error_1 = require("../errors/properties-parse.error");
const isNonEmptyLine = (line) => {
    return line.trim().length > 0;
};
const isLineValid = (line) => {
    if (!line.includes(tokens_1.EQUAL_SEPARATOR)) {
        throw new properties_parse_error_1.PropertiesParseError(line);
    }
    else {
        return true;
    }
};
exports.isLineValid = isLineValid;
const splitPropertiesIntoLines = (content) => {
    return content.split(tokens_1.NEWLINE_SEPARATOR).filter(isNonEmptyLine);
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
