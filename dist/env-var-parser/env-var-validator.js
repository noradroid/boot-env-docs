"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvVarSyntax = void 0;
const tokens_1 = require("./constants/tokens");
const env_var_utils_1 = require("./env-var-utils");
const env_var_parse_error_1 = require("./errors/env-var-parse.error");
const validateEnvVarSyntax = (tokens) => {
    let openedBracketsCount = 0;
    let prevToken = null;
    let prevWordOrToken = null;
    tokens.forEach((currToken) => {
        if (prevToken === null) {
            if (currToken === tokens_1.ENV_VAR_OPENING_BRACE) {
                openedBracketsCount += 1;
                prevToken = currToken;
            }
        }
        else if (prevToken === tokens_1.ENV_VAR_OPENING_BRACE) {
            if (currToken === tokens_1.COLON_SEPARATOR) {
                prevToken = currToken;
            }
            else if (currToken === tokens_1.ENV_VAR_CLOSING_BRACE) {
                if ((0, env_var_utils_1.isWordFileVariable)(prevWordOrToken)) {
                    openedBracketsCount -= 1;
                    prevToken = null;
                }
                else {
                    throw new env_var_parse_error_1.EnvVarParseError("MISSING_COLON");
                }
            }
            else if (currToken === tokens_1.ENV_VAR_OPENING_BRACE ||
                currToken === tokens_1.OPENING_CURLY_BRACE) {
                throw new env_var_parse_error_1.EnvVarParseError("MISSING_CLOSING_BRACE");
            }
        }
        else if (prevToken === tokens_1.COLON_SEPARATOR) {
            if (currToken === tokens_1.ENV_VAR_CLOSING_BRACE) {
                openedBracketsCount -= 1;
                prevToken = null;
            }
            else if (currToken === tokens_1.OPENING_CURLY_BRACE) {
                openedBracketsCount += 1;
                prevToken = currToken;
            }
        }
        else if (prevToken === tokens_1.OPENING_CURLY_BRACE) {
            if (currToken === tokens_1.CLOSING_CURLY_BRACE) {
                openedBracketsCount -= 1;
                if (openedBracketsCount === 0) {
                    prevToken = null;
                }
                else {
                    prevToken = currToken;
                }
            }
        }
        else if (prevToken === tokens_1.CLOSING_CURLY_BRACE) {
            if (currToken === tokens_1.CLOSING_CURLY_BRACE) {
                openedBracketsCount -= 1;
                if (openedBracketsCount === 0) {
                    prevToken = null;
                }
                else {
                    prevToken = currToken;
                }
            }
            else if (currToken === tokens_1.OPENING_CURLY_BRACE) {
                openedBracketsCount += 1;
                prevToken = currToken;
            }
        }
        else {
            throw new env_var_parse_error_1.EnvVarParseError("IDK_WHAT_HAPPENED");
        }
        prevWordOrToken = currToken;
    });
    if (prevToken !== null) {
        throw new env_var_parse_error_1.EnvVarParseError("MISSING_CLOSING_BRACE");
    }
};
exports.validateEnvVarSyntax = validateEnvVarSyntax;
