"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvVarParseError = void 0;
class EnvVarParseError extends Error {
    constructor(code) {
        super();
        this.name = "EnvVarParseError";
        this.code = "MISSING_VALUE_ASSIGN";
        this.code = code;
        if (code === "MISSING_CLOSING_BRACE") {
            this.message =
                "Environment variable definition should be closed with a closing brace '}'";
        }
        else if (code === "MISSING_COLON") {
            this.message =
                "Empty default value should be specified be providing a colon ':' before the closing brace";
        }
        else {
            this.message = "There's no way you got here";
        }
    }
}
exports.EnvVarParseError = EnvVarParseError;
