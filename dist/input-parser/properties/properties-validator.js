"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDotProperties = void 0;
const error_utils_1 = require("../shared/utils/error-utils");
const properties_parse_error_1 = require("./errors/properties-parse.error");
const properties_utils_1 = require("./utils/properties-utils");
const parseProperties = (content) => {
    const lines = (0, properties_utils_1.splitPropertiesIntoLines)(content);
    try {
        lines.forEach(properties_utils_1.isLineValid);
        return true;
    }
    catch (err) {
        // PropertiesParseError
        if (err instanceof properties_parse_error_1.PropertiesParseError) {
            console.error((0, error_utils_1.formatParseError)(err));
            // PropertiesParseError - caused by MISSING_VALUE_ASSIGN
            // = Property is not assigned a value
        }
        else {
            console.error(err);
        }
        return false;
    }
};
/**
 * Return true if content is valid properties.
 * @param content - Properties file content
 */
const validateDotProperties = (content) => {
    return parseProperties(content);
};
exports.validateDotProperties = validateDotProperties;
