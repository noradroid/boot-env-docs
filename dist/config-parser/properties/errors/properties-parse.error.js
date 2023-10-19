"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesParseError = void 0;
class PropertiesParseError extends Error {
    constructor(property) {
        super();
        this.name = "PropertiesParseError";
        this.code = "MISSING_VALUE_ASSIGN";
        this.message = `Property '${property}' is not assigned a value`;
    }
}
exports.PropertiesParseError = PropertiesParseError;
