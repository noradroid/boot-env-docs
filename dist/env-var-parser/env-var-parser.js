"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTokensIntoEnvVarDefaults = void 0;
const tokens_1 = require("./constants/tokens");
const env_var_utils_1 = require("./env-var-utils");
/**
 * Parse tokens between startIndex and endIndex into env var and default value.
 */
const parseTokensIntoEnvVarDefault = (tokens, startIndex, endIndex) => {
    const colonIndex = tokens.indexOf(tokens_1.COLON_SEPARATOR, startIndex);
    const envVar = tokens[colonIndex - 1];
    const defaultStr = tokens.slice(colonIndex + 1, endIndex).join("");
    return { envVar, default: defaultStr };
};
const parseTokensIntoEnvVarDefaults = (tokens) => {
    const envVarDefaults = [];
    let startIndex = (0, env_var_utils_1.getEnvVarStartIndex)(tokens);
    let endIndex = 0;
    while (startIndex < tokens.length) {
        endIndex = (0, env_var_utils_1.getEnvVarEndIndex)(tokens, startIndex);
        envVarDefaults.push(parseTokensIntoEnvVarDefault(tokens, startIndex, endIndex));
        startIndex = endIndex + 1;
    }
    return envVarDefaults;
};
exports.parseTokensIntoEnvVarDefaults = parseTokensIntoEnvVarDefaults;
